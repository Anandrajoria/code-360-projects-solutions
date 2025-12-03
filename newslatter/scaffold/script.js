const modeSwitch=document.querySelector(".mode-switch")
const modeIcon=document.getElementById("mode-icon")

modeIcon.textContent="🌙"

modeSwitch.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode")

    if(document.body.classList.contains("light-mode")){
        modeIcon.textContent="🌞"

    }else{
        modeIcon.textContent="🌙"
    }
})

