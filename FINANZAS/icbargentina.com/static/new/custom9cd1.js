$('.carousel.carousel-multi .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().attr("aria-hidden", "true").appendTo($(this));

    if (next.next().length > 0) {
        next.next().children(':first-child').clone().attr("aria-hidden", "true").appendTo($(this));
    }
    else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.getElementById("myBtn")){
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
      } else {
        document.getElementById("myBtn").style.display = "none";
      }
    }
  }

/*
$(function(){ 
    var navMain = $("#navbar13");
    navMain.on("click", "a", null, function () {
        navMain.collapse('hide');
    });
});
*/

function disable_button_and_show_spinner(button_id, spinner_id){
  document.getElementById(button_id).disabled = true;
  document.getElementById(spinner_id).hidden = false;
}

function setPaymentMethod(){
  let selected_course_index = document.getElementById("id_modality").selectedIndex;
  let selected_payment_method = document.getElementById("id_modality").children[selected_course_index].getAttribute("payment_method");
  document.getElementById("id_payment_method").value = selected_payment_method;
}
