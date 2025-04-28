import { animate, scroll, stagger, easeIn, delay, spring} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

let titleHover

$(document).ready(function() {
    animate(
        ".fadein",
        {opacity: 1, scale: 1},
        {duration: 0.5}
    )
})

$(".homeButton").hover(function() {
    if($(this).data("clicked")=="true") return
    animate(
        "#"+$(this).attr("id"),
        {scale:1.15},
        {duration: .2,  type: spring, stiffness:150, damping: 10}
    )
}, function() {
    if($(this).data("clicked")=="true") return
    animate(
        "#"+$(this).attr("id"),
        {scale:1},
        {duration: .2,  type: spring, stiffness:150, damping: 10}
    )
})

$(".homeButton").click(function() {
    const link = $(this).data("link");
    $(this).data("clicked", "true")

    $(this).parent().addClass("fixed");
    
    animate(
        $(this).parent().find("img").toArray(),
        {scale: 3.75, left: "44vw", top: "3vw", zIndex: "101"},
        { duration: 0.5 }
    )

    animate(
        "#"+$(this).attr("id"),
        { scale: 40 },
        { duration: 0.5 }
      ).then(() => {
        if (link) window.location.href = link;
      });
})

$(".shiftTitleContainer").hover(function() {
    
    const $this = $(this).find(".shiftTitle")

    const siz = $this.css("font-size")

    // Prepare font arrays
    const otfFonts = [
        "OTF-1",
        "OTF-2",
        "OTF-3", 
        "OTF-4",
        "OTF-5",
        "OTF-6",
        "OTF-7",
        "OTF-8", 
        "OTF-9",
        "OTF-10",
        "OTF-11",
        "OTF-12",
        "OTF-13",
        "OTF-14",
        "OTF-15"
    ];
    const ttfFonts = [
        "TTF-1",
        "TTF-2",
        "TTF-3", 
        "TTF-4",
        "TTF-5",
        "TTF-6",
        "TTF-7",
        "TTF-8", 
        "TTF-9",
        "TTF-10",
        "TTF-11",
        "TTF-12",
        "TTF-13", 
        "TTF-14",
        "TTF-15",
        "TTF-16",
        "TTF-17",
        "TTF-18",
        "TTF-19",
        "TTF-20",
        "TTF-21",
        "TTF-22",
        "TTF-23",
        "TTF-24",
        "TTF-25",
        "TTF-26",
        "TTF-27"
    ];

    const fontSizeDict = {
        "OTF-1":5,
        "OTF-2":5,
        "OTF-3":3.5, 
        "OTF-4":2.375,
        "OTF-5":3,
        "OTF-6":3.25,
        "OTF-7":5.5,
        "OTF-8":3.5, 
        "OTF-9":3.25,
        "OTF-10":5.5,
        "OTF-11":3.75,
        "OTF-12":3.3,
        "OTF-13":5,
        "OTF-14":4.6,
        "OTF-15":2.35,
        "TTF-1":10,
        "TTF-2":3.5,
        "TTF-3":3.5, 
        "TTF-4":4.5,
        "TTF-5":4.5,
        "TTF-6":5.5,
        "TTF-7":5,
        "TTF-8":3, 
        "TTF-9":4,
        "TTF-10":9,
        "TTF-11":7,
        "TTF-12":5,
        "TTF-13":3.25, 
        "TTF-14":4,
        "TTF-15":4,
        "TTF-16":3.5,
        "TTF-17":2.75,
        "TTF-18":2.4,
        "TTF-19":2,
        "TTF-20":2.75,
        "TTF-21":3.25,
        "TTF-22":3.25,
        "TTF-23":2.75,
        "TTF-24":2.6,
        "TTF-25":2.7,
        "TTF-26":3.7,
        "TTF-27":3.3,
    }
    
    titleHover = setInterval(function() {
        const fontType = Math.round(Math.random()); // 0 = OTF, 1 = TTF
        const fontList = fontType ? ttfFonts : otfFonts;
        const fontChoice = Math.floor(Math.random() * fontList.length);

        // console.log(fontSizeDict[fontList[fontChoice]])

        $this.css("font-family", `'${fontList[fontChoice]}'`);
        $this.css("font-size", `${fontSizeDict[fontList[fontChoice]]}vw`);
    }, 80);

}, function() {
    clearInterval(titleHover);
});