const body = document.getElementsByTagName("body");
const note = document.getElementsByClassName("note");

body[0].addEventListener("mousemove", function (e){
  
  var x = e.pageX;
  var y = e.pageY;
  
  note[0].style.transform = `rotateY( ${x}deg) rotateX( ${y}deg)`;
  
});

 //for mobile and tablet

 document.addEventListener("touchmove",(e)=>{

  

      var x = e.touches[0].pageX;

      var y = e.touches[0].pageY;

  

 note[0].style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;

  

})