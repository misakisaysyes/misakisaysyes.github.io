(function setupMermaid() {
  const sourceByDiagram = new Map();
  let mermaidPromise;
  let renderQueue = Promise.resolve();
  let renderedMode;

  const selectors = [
    'pre > code.mermaid',
    'pre > code.language-mermaid',
    'figure.highlight.mermaid td.code > pre',
  ];

  const loadScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(script);
  });

  async function loadMermaid() {
    if (window.mermaid) return window.mermaid;
    const cdnUrls = [
      'https://registry.npmmirror.com/mermaid/11.12.0/files/dist/mermaid.min.js',
      'https://cdn.staticfile.net/mermaid/11.12.0/mermaid.min.js',
    ];

    for (const cdnUrl of cdnUrls) {
      try {
        await loadScript(cdnUrl);
        if (window.mermaid) return window.mermaid;
      } catch (error) {
        console.warn(error);
      }
    }

    throw new Error('Unable to load Mermaid from the configured CDNs.');
  }

  function getMermaid() {
    if (!mermaidPromise) mermaidPromise = loadMermaid();
    return mermaidPromise;
  }

  function normalizeCodeBlocks() {
    document.querySelectorAll(selectors.join(',')).forEach((codeBlock) => {
      const container = codeBlock.closest('figure.highlight.mermaid') || codeBlock.parentElement;
      const diagram = document.createElement('pre');
      diagram.className = 'mermaid';
      diagram.textContent = codeBlock.textContent;
      container.replaceWith(diagram);
    });
  }

  function register(diagrams) {
    diagrams.forEach((diagram) => {
      if (!sourceByDiagram.has(diagram)) {
        const source = diagram.dataset.mermaidSource || diagram.textContent;
        sourceByDiagram.set(diagram, source);
        diagram.dataset.mermaidSource = source;
      }
    });
  }

  function initializeMermaid(wrap) {
    const colorMode = document.documentElement.getAttribute('color-mode') === 'dark'
      ? 'dark'
      : 'light';
    const renderMode = `${colorMode}:${wrap}`;
    if (renderMode === renderedMode) return;
    renderedMode = renderMode;

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      sequence: {
        useMaxWidth: true,
        wrap,
        diagramMarginX: 20,
        diagramMarginY: 12,
        actorMargin: 70,
        width: 150,
        messageMargin: 30,
        noteMargin: 10,
      },
    });
  }

  async function render(diagrams) {
    const nodes = Array.from(diagrams || []).filter((diagram) => diagram && document.contains(diagram));
    if (nodes.length === 0) return;
    await getMermaid();
    register(nodes);

    nodes.forEach((diagram) => {
      diagram.removeAttribute('data-processed');
      diagram.textContent = diagram.dataset.mermaidSource || sourceByDiagram.get(diagram);
      diagram.removeAttribute('data-mermaid-error');
    });
    const groups = new Map();
    nodes.forEach((diagram) => {
      const wrap = !diagram.classList.contains('cors-sequence');
      if (!groups.has(wrap)) groups.set(wrap, []);
      groups.get(wrap).push(diagram);
    });

    for (const [wrap, group] of groups) {
      initializeMermaid(wrap);
      await window.mermaid.run({ nodes: group });
    }
  }

  function queueRender(diagrams) {
    const nodes = Array.from(diagrams || []);
    renderQueue = renderQueue
      .then(() => render(nodes))
      .catch((error) => {
        console.error('Failed to render Mermaid diagrams:', error);
        nodes.forEach((diagram) => {
          diagram.dataset.mermaidError = '';
          diagram.title = error instanceof Error ? error.message : String(error);
        });
      });
    return renderQueue;
  }

  window.renderMermaidDiagram = (diagram) => {
    register([diagram]);
    return queueRender([diagram]);
  };

  normalizeCodeBlocks();
  const initialDiagrams = Array.from(document.querySelectorAll('pre.mermaid'));
  register(initialDiagrams);
  queueRender(initialDiagrams);

  const observer = new MutationObserver((mutations) => {
    const addedDiagrams = [];
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches && node.matches('pre.mermaid')) addedDiagrams.push(node);
        if (node.querySelectorAll) addedDiagrams.push(...node.querySelectorAll('pre.mermaid'));
      });
    });
    if (addedDiagrams.length) {
      register(addedDiagrams);
      queueRender(addedDiagrams);
    }
  });

  if (document.body) observer.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(() => {
    const diagrams = Array.from(sourceByDiagram.keys());
    if (diagrams.length) queueRender(diagrams);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['color-mode'],
  });
}());
