$(document).ready(function () {
  let pointCount = 0;

  $("#operations_diplay_random").toggle();
  $("#validate_btn").toggle();
  $("#restart_btn").toggle();
  $("#user_result").toggle();

  const newNumber = (multi) => {
    return Math.floor(Math.random() * multi);
  };

  //Theme selection
  const colorChanger = (colorSelection) => {
    $("html").removeClass("blue green pink yellow");
    $("html").addClass(colorSelection);
    $("button").removeClass("blue green pink yellow");
    $("button").addClass(colorSelection);
  };

  $("#color_theme_links_blue").on("click", function (e) {
    e.preventDefault();
    colorChanger("blue");
  });

  $("#color_theme_links_green").on("click", function (e) {
    e.preventDefault();
    colorChanger("green");
  });
  $("#color_theme_links_pink").on("click", function (e) {
    e.preventDefault();
    colorChanger("pink");
  });
  $("#color_theme_links_yellow").on("click", function (e) {
    e.preventDefault();
    colorChanger("yellow");
  });

  //Theme menu animation
  let clickCount = 0;

  $(".menu-btn").on("click", function () {
    if (clickCount == 0) {
      $(".menu-btn").addClass("open");
      $(".nav-menu").addClass("open");
      clickCount = 1;
    } else {
      $(".menu-btn").toggleClass("open");
      $(".menu-btn").toggleClass("closed");
      $(".nav-menu").toggleClass("open");
      $(".nav-menu").toggleClass("closed");
    }
  });

  //Date
  const printDate = () => {
    let t = new Date();
    let mois = [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ];
    $("#date").html(
      `${t.getUTCDate()} ${mois[t.getUTCMonth()]} ${t.getUTCFullYear()}`
    );
    $("#time").html(`${t.getHours()} : ${t.getMinutes()} : ${t.getSeconds()}`);
  };
  setInterval(printDate, 1000);

  //Ecrire dans le tableau des records
  const recordSelector = (DOMrecordSection) => {
    localStorage.setItem($("#level_selector").val(), pointCount);
    $("#" + DOMrecordSection).html(
      `${localStorage.getItem($("#level_selector").val())} Points !!!`
    );
  };

  const initialisation = (...niveau) => {
    for (let num of niveau) {
      if (localStorage.getItem(num) != null) {
        $("#content_" + num).html(`${localStorage.getItem(num)} Points !!!`);
      } else {
        $("#content_" + num).html("Pas de record");
      }
    }
  };
  initialisation("niveau1", "niveau2", "niveau3", "niveau4");

  //Affichage de l'operation
  const addition = {
    level1() {
      nb1 = newNumber(10);
      nb2 = newNumber(10);
      nb3 = 0;
      $("#operations_diplay_random").html(`${nb1} + ${nb2}  = `);
    },
    level2() {
      nb1 = newNumber(10);
      nb2 = newNumber(100);
      nb3 = 0;
      $("#operations_diplay_random").html(`${nb1} + ${nb2}  = `);
    },
    level3() {
      nb1 = newNumber(10);
      nb2 = newNumber(100);
      nb3 = newNumber(100);
      $("#operations_diplay_random").html(`${nb1} + ${nb2} + ${nb3} = `);
    },
    level4() {
      nb1 = newNumber(100);
      nb2 = newNumber(100);
      nb3 = newNumber(1000);
      $("#operations_diplay_random").html(`${nb1} + ${nb2} + ${nb3} = `);
    },
  };

  const operationAddition = () => {
    switch ($("#level_selector").val()) {
      case "niveau1":
        addition.level1();
        break;
      case "niveau2":
        addition.level2();
        break;
      case "niveau3":
        addition.level3();
        break;
      case "niveau4":
        addition.level4();
        break;
      default:
        console.log("Grosse erreur de code ;)");
    }
  };

  //New game
  $("#start_btn").on("click", function (e) {
    e.preventDefault();
    $("#start_btn").toggle();
    $("#operations_diplay_random").fadeToggle();
    $("#validate_btn").fadeToggle(500);
    $("#level_selector").toggle();
    $("#user_result").fadeToggle();
    operationAddition();
  });

  //Traitement des reponses + traitement des scores + rematch
  $("#validate_btn").on("click", function (e) {
    e.preventDefault();
    if (nb1 + nb2 + nb3 == $("#user_result").val()) {
      pointCount++;
      $(".title").animate({ right: "+=20px", fontSize: "+=20px" }, 500);
      $(".title").animate({ right: "-=40px" }, 500);
      $(".title").animate({ right: "+=20px", fontSize: "-=20px" }, 500);
      console.log(`Bien joué !!! - Nombre de points : ${pointCount}`);
      if (pointCount != 1) {
        $("#point_number").html(`Nombre de points  :  ${pointCount}`);
      } else {
        $("#point_number").html(`Nombre de point  :  ${pointCount}`);
      }
      operationAddition();
    } else {
      $("#operations_diplay_random").toggle();
      $("#point_number").html(`Partie terminée avec ${pointCount} points !`);
      $("#restart_btn").fadeToggle();
      $("#validate_btn").toggle();
      $("#level_selector").fadeToggle();
      $("#user_result").toggle();
      if (
        pointCount >= localStorage.getItem($("#level_selector").val()) &&
        pointCount > 0
      ) {
        recordSelector("content_" + $("#level_selector").val());
        $("#point_number").html(
          `Partie terminée avec ${pointCount} points ! Nouveau record !!!`
        );
      }
    }

    $("#user_result").val("");
    operationAddition();
  });

  $("#restart_btn").on("click", function () {
    $("#operations_diplay_random").fadeToggle();
    $("#validate_btn").fadeToggle();
    $("#restart_btn").toggle();
    $("#level_selector").toggle();
    $("#point_number").html("");
    $("#user_result").fadeToggle();
    pointCount = 0;
    operationAddition();
  });
});
