// shop.js
import { animate, scroll, stagger, easeIn, delay, spring} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

$(document).ready(function() {

    animate(
        "#artContainer .preview",
        { opacity: 1, y: 0 },
        { duration: 0.5, delay: stagger(0.15)}
    )

    $(".preview").hover(function() {
        if($(this).data("open")=="true") return
        
        animate(
            "#"+$(this).attr("id")+" .thumbnail",
            { scale: 1.1 },
            { duration: 0.5 }
        )
        
    }, function() {
        if($(this).data("open")=="true") return
        animate(
            "#"+$(this).attr("id")+" .thumbnail",
            { scale: 1 },
            { duration: 0.5 }
        )
    })

    $(".buyButton").hover(function() {
        animate(
            $(this).toArray(),
            {boxShadow: ["inset 0 0 15px 5px rgba(0, 0, 0, 0.6)", "inset 0 0 50px 2px rgba(0, 0, 0, 0.8)"] },
            {duration: 0.25}
        )
    }, function() {
        animate(
            $(this).toArray(),
            {boxShadow: ["inset 0 0 50px 2px rgba(0, 0, 0, 0.8)", "inset 0 0 15px 5px rgba(0, 0, 0, 0.6)"] },
            {duration: 0.25}
        )
    })

    $(".preview").click(function(e) {
        e.stopPropagation();
        const $preview = $(this);

        if($preview.data("open")=="true") return
        $preview.data("open", "true").attr("data-open", "true")
      
        // measure & lock in starting box:
        const rect = this.getBoundingClientRect();
        $preview.css({
          position: "fixed",
          zIndex: 99,
          top:    rect.top  + "px",
          left:   rect.left + "px",
          width:  rect.width  + "px",
          height: rect.height + "px",
          cursor: "auto",
        });
      
        // animate open — capture controllers:
        const openAnim  = animate(
          "#" + $preview.attr("id"),
          {
            top:    [ rect.top + "px",  "10vh" ],
            left:   [ rect.left + "px", "10vw" ],
            width:  [ rect.width + "px",  "80vw" ],
            height: [ rect.height + "px", "80vh" ],
          },
          { duration: 0.5 }
        );

        const thumbAnim = animate(
          "#" + $preview.attr("id") + " .thumbnail",
          {
            margin: [ "0px", "5%" ],
            height: [ rect.height * 0.2 + "px", "80%" ],
            width:  [ rect.width  * 0.2 + "px", "auto" ],
          },
          { duration: 0.5 }
        );

        $("#inbetween").css({
            zIndex:3,
            pointerEvents:"all",
            cursor:"pointer",
        })

        const darkenAnim = animate(
            "#inbetween",
            {
                opacity: [0, 0.5]
            }
        )

        const originalLabel = $preview.find(".label").html()
        console.log($preview.data("description"))
        $preview.find(".label").html(`<p style="left:40%;position:absolute;width:30%;">${$preview.data("description")}</p>`)

        $preview.find(".label").css({
            height: "100%",
            position: "absolute",
            zIndex: "-1"
        })
      
        // store them for later:
        $preview.data("openAnim", openAnim);
        $preview.data("thumbAnim", thumbAnim);
        $preview.data("darkenAnim", darkenAnim);
      
        // bind outside‐click:
        setTimeout(() => {
          $(document).on("click.previewOutside", function(evt) {
            if (!$(evt.target).closest($preview).length) {
            $preview.data("open", "false").attr("data-open", "false")
              // reverse both animations:
              openAnim.speed  = -1;
              thumbAnim.speed = -1;
              darkenAnim.speed = -1;
              // (re)start playing backwards:
              openAnim.play();
              thumbAnim.play();
              darkenAnim.play();
      
              // when the “open” animation has run back to time=0, clean up
              openAnim.finished.then(() => {
                // restore original CSS
                $preview.css({
                  position: "", top: "", left: "", width: "", height: "", zIndex: ""
                });
                $preview.find(".label").css({
                    position:"relative",zIndex:2,height:"auto"
                })
                $preview.find(".label").html(originalLabel)
                $("#inbetween").css({
                    zIndex:-1,
                    pointerEvents:"none",
                    cursor:"auto",
                })
                // remove handler
                $(document).off("click.previewOutside");
              });
            }
          });
        }, 0);
      });
      

})