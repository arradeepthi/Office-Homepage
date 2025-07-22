let bgCol=document.getElementById("bgCol");
let section1=document.getElementById("section1");
let section2=document.getElementById("section2");
let heading1=document.getElementById("heading1");
let t1=document.getElementById("t1");
let t3=document.getElementById("t3");
let isDark=false;
bgCol.addEventListener("click", function(){
    if(!isDark){
        document.body.style.backgroundColor="black";
        document.body.style.color="white";
        bgCol.src="assets/light.png";
        section1.style.backgroundColor="#1a1a1a";
        heading1.style.color="#dddddd";
        section2.style.backgroundColor="#121826";
        document.querySelectorAll(".offer").forEach(function(el) {
            el.style.backgroundColor = "rgba(237, 238, 217, 1)";
            el.style.color = "black";
        });
        t1.style.color="black";
        t3.style.color="black";
        isDark=true;
    }else{
        document.body.style.backgroundColor="white";
        document.body.style.color="black";
        bgCol.src="assets/dark.png";
        section1.style.backgroundColor="#f7f7f7";
        heading1.style.color="#1d292dff";
        section2.style.backgroundColor = "white";
        document.querySelectorAll(".offer").forEach(function(el) {
            el.style.backgroundColor = "white";
            el.style.color = "black";
        });
        isDark=false;
    }
})

const text="Welcome to Miratos - Innovate. Scale. Deliver.";
let i=0;
type = () =>{
    if(i<text.length){
        heading1.textContent+=text.charAt(i);
        i++;
        setTimeout(type,80);
    }else{
        setTimeout(()=>{
            heading1.textContent="";
            i=0;
            type();
        }, 2000);
    }
}
window.onload=function(){
    type();
};