import { animate, scroll, stagger, easeIn, delay, spring} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"


$(document).ready(function() {
    
    animate(
        "#aboutTitle",
        { opacity: 1, scale: 1 },
        { duration: 0.5}
    )

    animate(
        "#profile",
        { opacity: 1, scale: 1 },
        { duration: 0.5}
    )
})