import { animate, scroll, stagger, easeIn, delay} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

let globalButtonDist = 50

$(document).ready(function() {

    makeShatterButton(
        "shopButton",
        "30%",
        "75%",
        $(".container"),
        "Shop",
        "shop.html",
        "#F06543",
        "white",
        "")

    makeShatterButton(
        "demoButton",
        "30%",
        "75%",
        $(".container"),
        "Demos",
        "demos.html",
        "#70C1B3",
        "white",
        "")

    makeShatterButton(
        "aboutButton",
        "30%",
        "75%",
        $(".container"),
        "About Me",
        "about.html",
        "#36393B",
        "white",
        "")

    $(".shatterButton").hover(
        function () {
            
            const $currentButton = $(this);
            
            animate("#"+$currentButton.attr("id")+" .fragment", {
                x: 0,
                y: 0,
                rotate: 0
            }, { duration: 0.25, ease: [1, 0.085, 0.68, 0.53], delay: stagger(0.001)})

            animate("#"+$currentButton.attr("id")+" .shatterText", {
                scale: 1.2,
                opacity: 1
            }, {duration: 0.5, delay: 0.25})

        },
        function () {

            const $currentButton = $(this);

            $currentButton.find(".fragment").each(function(_, fragment) {
                const offsetX = fragment.dataset.offsetX
                const offsetY = fragment.dataset.offsetY
                const rotation = fragment.dataset.rotation
    
                let destroyButton = animate(fragment, {
                    x: Number(offsetX),
                    y: Number(offsetY),
                    rotate: Number(rotation)
                }, { duration: 0.25, ease: [0.0, 0.0, 0.25, 1] })
            })

            animate("#"+$currentButton.attr("id")+" .shatterText", {
                scale: 0.8,
                opacity: 0
            }, {duration: 0.25})
        }
    )

    $(".shatterButton").on("click", function() {
        const rect = this.getBoundingClientRect();
        const link = $(this).data("link");
      
        // create overlay with jQuery and set its initial CSS

        const $overlay = $("<div>").css({
          position: "fixed",
          top:   rect.top   + "px",
          left:  rect.left  + "px",
          width: rect.width + "px",
          height:rect.height+ "px",
          background: $(this).find(".fragment").css("background-color"),
          zIndex: 9999,
          transformOrigin: "top left",
          opacity:0,
          pointerEvents: "none"
        }).appendTo("body");
      
        // run the Motion One animation on the raw DOM node
        
        animate(
            "#"+$(this).attr("id")+" .shatterText",
            { scale: 0.8, opacity: 0},
            {duration: 0.5}
        )

        animate(
            $overlay.toArray(),
            { opacity: 1 },
            { duration: 0.25, delay: 0.25 }
          )
        
        animate(
          $overlay.toArray(),
          { top: 0, left: 0, width: "100vw", height: "100vh" },
          { duration: 0.6, easing: [0, 0.71, 0.2, 1.01], delay:0.25 }
        ).then(() => {
          if (link) window.location.href = link;
        });
      });


    animate(
        ".shiftTitleContainer",
        { opacity: 1, scale: 1 },
        { duration: 0.5}
    )

    animate(
        ".shatterButton",
        { opacity: 1, scale: 1 },
        { duration: 0.5}
    )
});

function makeShatterButton(id, w, h, $elementToAppend, text, link, bgcol, col, style) {
    let $buttonContainer = $(`<div id="${id}" class="shatterButton fadein" data-link="${link}" style="width:${w};height:${h};color:${col};${style}"></div>`)

    $buttonContainer.append(`<h2 class="shatterText" style="opacity: 0; scale: 0.8;">${text}</h2>`)

    $buttonContainer.append(`<div class="shatterButtonBG" style="opacity: 0;background-color:${bgcol};"></div>`)

    let F = new fragmenter(0, 0, 1, 1, 11)
    
    let fragments = F.collapse()

    for(let i = 0; i < fragments.length; i++) {
        let c = fragments[i]

        let angFromCenter = Math.atan2(c.midy - 0.5, c.midx - 0.5)
        let distFromCenter = ((c.midx-0.5)**2 + (c.midy-0.5)**2)**0.5
        let offsetX = (Math.random()**8)*10*globalButtonDist*Math.cos(angFromCenter)
        let offsetY = (Math.random()**8)*10*globalButtonDist*Math.sin(angFromCenter)
        let rotation = ((Math.random()*180)-90)*.5*(1+2*distFromCenter)//angFromCenter*(180/Math.PI)+90

        let $fragment = `<div id="${i}" class="fragment" style="
            top:${c.topy*100}%;
            left:${c.leftx*100}%;
            width:${c.width*100}%;
            height:${c.height*100}%;
            font-size:${c.width*0.5}px;
            background-color:${bgcol};
            border: solid ${bgcol} 1px;
            "
            data-offset-x="${offsetX}"
            data-offset-y="${offsetY}"
            data-rotation="${rotation}"
            >${text[i%text.length]}</div>`
        
        $buttonContainer.append($fragment)
    }

    $elementToAppend.append($buttonContainer)

    $(".fragment").each(function(i, fragment) {
        const offsetX = fragment.dataset.offsetX
        const offsetY = fragment.dataset.offsetY
        const rotation = fragment.dataset.rotation

        animate(fragment, {
            x: Number(offsetX),
            y: Number(offsetY),
            rotate: Number(rotation)
        }, { duration: 0 })
    })
}

class fragmenter {
    constructor(x1, y1, x2, y2, splits) {
        this.ratiofnx = () => randNeg()*0.25 + 0.5
        this.ratiofny = () => randNeg()*0.25 + 0.5

        this.width = x2-x1
		this.height = y2-y1
        this.midx = lerp(x1, x2, this.ratiofnx())
		this.midy = lerp(y1, y2, this.ratiofny())
		this.leftx = x1
		this.rightx = x2
		this.topy = y1
		this.bottomy = y2

        this.children = []

        for(let i = 0; i < splits; i++) {
            this.split()
        }
    }

    split() {
        if(this.children.length>0) {
            let distpercent = (dist(this.midx, this.midy, 0.5, 0.5)/(2**0.5))**0.5
            this.children.forEach((c)=>(Math.random()<distpercent?c.split():0))
        } else {
            this.children.push(new fragmenter(this.leftx, this.topy, this.midx, this.midy, 0))
			this.children.push(new fragmenter(this.midx, this.topy, this.rightx, this.midy, 0))
			this.children.push(new fragmenter(this.leftx, this.midy, this.midx, this.bottomy, 0))
			this.children.push(new fragmenter(this.midx, this.midy, this.rightx, this.bottomy, 0))
        }
    }

    collapse() {
        if(this.children.length==0) return [this]
        var out = []
        this.children.forEach((c)=>(c.collapse().forEach((d)=>out.push(d))))
        return out
    }
}

function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

function randomGaussian(mean = 0, stddev = 1) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();  // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();  // Converting [0,1) to (0,1)
    
    let z0 = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    // let z1 = Math.sqrt(-2 * Math.log(u)) * Math.sin(2 * Math.PI * v); // Optional, for two random numbers

    return z0 * stddev + mean;
}

function randNeg() {
    return (Math.random()-0.5)*2
}

function dist(x1, y1, x2, y2) {
    return ((y2-y1)**2 + (x2-x1)**2)**0.5
}