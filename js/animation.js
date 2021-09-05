const fireworkEl = document.getElementById('user-name')
const fireworkTimeline = new mojs.Timeline()

const burst1 = new mojs.Burst({
    parent:             fireworkEl,
    left: 				'0%',
    top:  				'-50%',
    radius: 			{0:60},
    count: 				6,
    children: {
        fill : 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    1300,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})

const burst2 = new mojs.Burst({
    parent:             fireworkEl,
    left: '-100%', 
    top: '-20%',
    count: 		        14,
    radius: 		{0:120},
    children: {
        fill: 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    1600,
        delay: 			100,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})

const burst3 = new mojs.Burst({
    parent:             fireworkEl,
    left: '128%', top: '-70%',
    count: 				8,
    radius: 			{0:90},
    children: {
        fill: 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    1500,
        delay: 			200,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})

const burst4 = new mojs.Burst({
    parent:             fireworkEl,
    left: '-20%', top: '-150%',
    count: 		    14,
    radius: 	    {0:60},
    children: {
        fill: 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    2000,
        delay: 			300,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})

const burst5 = new mojs.Burst({
    parent:             fireworkEl,
    left: '30%', top: '-100%',
    count: 		    12,
    radius: 		{0:90},
    children: {
        fill: 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    1400,
        delay:          400,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})

const burst6 = new mojs.Burst({
    parent:             fireworkEl,
    left:               '109%',
    top:                '45%',
    count: 				8,
    radius: 			{0:60},
    children: {
        fill: 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    1280,
        delay: 			500,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})

const burst7 = new mojs.Burst({
    parent:             fireworkEl,
    left:               '200%',
    top:                '70%',
    count: 				8,
    radius: 			{0:90},
    children: {
        fill: 			[ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
        duration: 	    1200,
        delay: 			300,
        easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
    }
})


const heartEl = document.getElementById('user-icon')
const tween = new mojs.Tween({
    duration:       869.57,
    onUpdate: function(progress) {
        let factor
        if (progress < 0.5) {
            factor = 0.85 + 0.55 * (progress / 0.5)
        } else if (progress < 1) {
            factor = 1.5 - 0.5 * ((progress - 0.5) / 0.5)
        } else if (progress == 1) {
            factor = 1
        }
        heartEl.style.transform = `scale(${factor})`
    }
})

fireworkTimeline.add(burst1, burst2, burst3, burst4, burst5, burst6, burst7)
fireworkEl.addEventListener('mouseenter', e => {
    fireworkTimeline.replay()
    tween.replay()
})
heartEl.addEventListener('mouseenter', e => {
    tween.replay()
})

