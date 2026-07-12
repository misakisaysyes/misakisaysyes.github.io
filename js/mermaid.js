(async function renderMermaidDiagrams() {
  const selectors = [
    'pre > code.mermaid',
    'pre > code.language-mermaid',
    'figure.highlight.mermaid td.code > pre',
  ];
  const codeBlocks = document.querySelectorAll(selectors.join(','));

  for (const codeBlock of codeBlocks) {
    const container = codeBlock.closest('figure.highlight.mermaid') || codeBlock.parentElement;
    const diagram = document.createElement('pre');

    diagram.className = 'mermaid';
    diagram.textContent = codeBlock.textContent;
    container.replaceWith(diagram);
  }

  const diagrams = document.querySelectorAll('pre.mermaid');

  if (diagrams.length === 0) return;

  const loadScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.src = url;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(script);
  });

  try {
    const cdnUrls = [
      'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js',
      'https://unpkg.com/mermaid@11/dist/mermaid.min.js',
    ];

    for (const cdnUrl of cdnUrls) {
      try {
        await loadScript(cdnUrl);
        if (window.mermaid) break;
      } catch (error) {
        console.warn(error);
      }
    }

    if (!window.mermaid) {
      throw new Error('Unable to load Mermaid from the configured CDNs.');
    }

    const sources = new Map(Array.from(diagrams, (diagram) => [diagram, diagram.textContent]));
    let renderedMode;
    let renderQueue = Promise.resolve();

    const render = async () => {
      const colorMode = document.documentElement.getAttribute('color-mode') === 'dark'
        ? 'dark'
        : 'light';

      if (colorMode === renderedMode) return;
      renderedMode = colorMode;

      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: colorMode === 'dark' ? 'dark' : 'default',
      });

      for (const [diagram, source] of sources) {
        diagram.removeAttribute('data-processed');
        diagram.textContent = source;
      }

      await window.mermaid.run({ nodes: Array.from(sources.keys()) });
    };

    const scheduleRender = () => {
      renderQueue = renderQueue.then(render).catch((error) => {
        console.error('Failed to update Mermaid theme:', error);
      });
    };

    await render();

    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'color-mode')) {
        scheduleRender();
      }
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['color-mode'],
    });
  } catch (error) {
    console.error('Failed to render Mermaid diagrams:', error);

    for (const diagram of diagrams) {
      diagram.dataset.mermaidError = '';
      diagram.title = error instanceof Error ? error.message : String(error);
    }
  }
}());
