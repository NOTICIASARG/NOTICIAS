var telInput = $("#id_phone"),
    errorMsg = $("#error-msg"),
    validMsg = $("#valid-msg");

// initialise plugin
telInput.intlTelInput({
  initialCountry: "AR",
  autoHideDialCode: false,
  separateDialCode: false
  //utilsScript: "{% static 'blog/js/utils.js' %}"
});

var reset = function() {
  telInput.removeClass("error");
  errorMsg.addClass("hide");
  validMsg.addClass("hide");
};


// on blur: validate
telInput.blur(function() {
reset();
if ($.trim(telInput.val())) {
  if (telInput.intlTelInput("isValidNumber")) {
    validMsg.removeClass("hide");
  } else {
    telInput.addClass("error");
    errorMsg.removeClass("hide");
  }
}
});

// on keyup / change flag: reset
telInput.on("keyup change", reset);

function setStatesOptions(){
  let selectedCountry = $("#id_phone").intlTelInput("getSelectedCountryData")['name'].split(' (')[0];
  let states = s_a[country_arr.indexOf(selectedCountry) + 1].split("|");
  let stateElement = document.getElementById("id_state");

  if (stateElement) {
    stateElement.length = 0;
    stateElement.options[0] = new Option('Seleccionar provincia..', '');
    stateElement.selectedIndex = 0;

    for (var i = 0; i < states.length; i++) {
        stateElement.options[stateElement.length] = new Option(states[i], states[i]);
    }
  }
}

// Set initial state options
setStatesOptions();

// Set state options on country change
telInput.on("countrychange", setStatesOptions);

$( "#icb_contact" ).submit(function( event ) {
  var countryData = $("#id_phone").intlTelInput("getSelectedCountryData");
  var prefered_info = $("input:checked").map(function () { return this.value;}).get().join(',');
  var tel_without_plus_and_country_code = $("#id_phone").intlTelInput("getNumber").substring(1);
  $("#id_phone").val(tel_without_plus_and_country_code);
  $('<input />').attr('type', 'hidden')
      .attr('name', "country")
      .attr('value', countryData.iso2.toUpperCase())
      .appendTo('#icb_contact');
  $('<input />').attr('type', 'hidden')
      .attr('name', "requested_info")
      .attr('value', prefered_info)
      .appendTo('#icb_contact');
  $('<input />').attr('type', 'hidden')
      .attr('name', "country_code")
      .attr('value', countryData.dialCode)
      .appendTo('#icb_contact');
});


$( "#course_contact" ).submit(function( event ) {
  var tel_without_plus_and_country_code = $("#id_phone").intlTelInput("getNumber").substring(1);
  $("#id_phone").val(tel_without_plus_and_country_code);
});
