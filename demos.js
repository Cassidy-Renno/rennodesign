import { animate, scroll, stagger, easeIn, delay, spring} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

$(document).ready(function() {
    
    animate(
        "#demoTitle",
        { opacity: 1, scale: 1 },
        { duration: 0.5}
    )
})

