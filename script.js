/* **********/ ////// CONSTANTES DE FORMULARIO ////////********* */ */

const d = document;
const $inputFile = d.getElementById("inputFile"),
  $labelFile = d.querySelector(".data__file"),
  $dataBtns = d.querySelector(".data__btns"),
  $dataBtnsBtnRemove = d.querySelector(".data__btns--btn"),
  $dataDrag = d.querySelector(".data__drag"),
  $imageAvatar = d.getElementById("imageAvatar"),
  $btnBack = d.querySelector(".data__image--back"),
  $inputs = d.querySelectorAll(`input[autocomplete="off"]`),
  $btnTicket = d.querySelector(".data__btn");
//console.log($inputs)
/* **********/ ////// CONSTANTES DE RESPUESTA ////////********* */ */

const $replyName = d.getElementById("reply__name"),
  $replyEmail = d.getElementById("reply__email"),
  $infoName = d.querySelector(".info__name"),
  $infoGit = d.querySelector(".info__contact p"),
  $infoContactImage = d.querySelector(".info__img");

/* **********/ ////// CARGA DE ARCHIVO ////////********* */ */

let imageDefault = "assets/images/icon-upload.svg";

$inputFile.addEventListener("change", (e) => {
  //console.log(e.target.files[0]);
  if (
    e.target.files[0].type === "image/jpeg" ||
    e.target.files[0].type === "image/png"
  ) {
    // console.log("Tipo correcto");
    if (e.target.files[0].size < 500000) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $imageAvatar.src = e.target.result;
        $infoContactImage.src = e.target.result;
        $imageAvatar.dataset.image = "true";
      };
      reader.readAsDataURL(e.target.files[0]);
      d.querySelector(".data__image").style.padding = "0";
      $dataBtns.classList.remove("display-none");
      $labelFile.classList.add("display-none");
      d.querySelector(".data__warning").classList.remove("display-none");
      d.querySelector(".data__error").classList.add("display-none");
    } else {
      d.querySelector(".data__warning").classList.add("display-none");
      d.querySelector(".data__error").classList.remove("display-none");
      $dataBtns.classList.add("display-none");
      $labelFile.classList.remove("display-none");
      $imageAvatar.src = imageDefault;
    }
  } else {
    // console.log("Incorrecto");
    d.querySelector(".data__warning").classList.add("display-none");
    d.querySelector(".data__error").classList.remove("display-none");
    $dataBtns.classList.add("display-none");
    $labelFile.classList.remove("display-none");
    $imageAvatar.src = imageDefault;
  }
});

/* **********/ ////// BOTON DE REMOVER IMAGEN ////////********* */ */

$dataBtnsBtnRemove.addEventListener("click", (e) => {
  //console.log($inputFile.value);
  $inputFile.value = "";
  $imageAvatar.src = imageDefault;
  $imageAvatar.dataset.image = "false";

  $labelFile.classList.remove("display-none");
  $dataBtns.classList.add("display-none");
  d.querySelector(".data__warning").classList.remove("display-none");
  d.querySelector(".data__error").classList.add("display-none");
  d.querySelector(".data__image").style.padding = ".5rem";
});

/* **********/ ////// DRAG AND DROP ////////********* */ */

$dataDrag.addEventListener("dragover", (e) => {
  e.preventDefault();
  $dataDrag.classList.add("data__drag--active");
});

$dataDrag.addEventListener("dragleave", (e) => {
  e.preventDefault();
  $dataDrag.classList.remove("data__drag--active");
});

$dataDrag.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.dataTransfer.files[0].size > 500000) {
    d.querySelector(".data__warning").classList.add("display-none");
    d.querySelector(".data__error").classList.remove("display-none");
  } else {
    //console.log(e.dataTransfer.files[0]);
    $dataDrag.classList.remove("data__drag--active");

    let file = e.dataTransfer.files;

    $inputFile.file = file;

    $imageAvatar.src = URL.createObjectURL(file[0]);
    $infoContactImage.src = URL.createObjectURL(file[0]);

    $labelFile.classList.add("display-none");
    $dataBtns.classList.remove("display-none");
    $imageAvatar.classList.add("data_image");
    d.querySelector(".data__image").style.padding = "0";

    d.querySelector(".data__warning").classList.remove("display-none");
    d.querySelector(".data__error").classList.add("display-none");
  }
});

/* **********/ ////// GENERADOR DE TICKET ////////********* */ */

let error;
$inputs.forEach((el) => {
  el.value = "";
  error = `<p class="data__error--email data--error display-none" data-info="false">Please enter a valid ${el.name}</p>`;
  el.insertAdjacentHTML("afterend", error);
});

d.addEventListener("change", (e) => {
  if (e.target.matches(`input[autocomplete="off"]`)) {
    let input = e.target,
      pattern = input.pattern;

    let regex = new RegExp(pattern);

    if (regex.exec(input.value)) {
      input.nextSibling.classList.add("display-none");
    } else {
      input.nextSibling.classList.remove("display-none");
    }
  }
});

console.log($inputFile.files)

let errors = d.querySelectorAll(".data--error");

d.addEventListener("click", (e) => {
  if (e.target.matches(".data__btn")) {
    e.preventDefault();


    if ($inputFile.files.length === 1) {
      d.querySelector(".data__error").classList.add("display-none");
      d.querySelector(".data__warning").classList.remove("display-none");
    } else {
      d.querySelector(".data__error").classList.remove("display-none");
      d.querySelector(".data__warning").classList.add("display-none");

    }

   

    let i = 0;

    for (const err of errors) {
     
      if (
        !err.classList.contains("display-none") ||
        err.previousElementSibling.value === "" ||
        $imageAvatar.src ===
          "http://127.0.0.7:63783/assets/images/icon-upload.svg"
      ) {

        break;
      } else {

        i++;
      }
    }
    if (i === 4) {
      d.querySelector(".reply").classList.remove("display-none");
      d.querySelector(".form").classList.add("display-none")

      $replyName.textContent = d.getElementById("name").value
      $infoName.textContent = d.getElementById("name").value
      $replyEmail.textContent = d.getElementById("email").value
      $infoGit.textContent = d.getElementById("user").value

    }
  }

  if(e.target.matches(".data__image--back")){
    d.querySelector(".reply").classList.add("display-none");
    d.querySelector(".form").classList.remove("display-none")
  }
});

/* 
d.querySelector(".form").classList.remove("display-none")
   d.querySelector(".reply").classList.add("display-none")
    */

/* 
let error;
$inputs.forEach((el) => {
  el.value = "";
  error = `<p class="data__error--email data--error display-none" data-info="false">Please enter a valid ${el.name}</p>`;
  el.insertAdjacentHTML("afterend", error);
});

d.addEventListener("change", (e) => {
  if (e.target.matches(`input[autocomplete="off"]`)) {
    let input = e.target,
      pattern = input.pattern;

    let regex = new RegExp(pattern);

    if (regex.exec(input.value)) {
      console.log("VALOR CORRECTO");
      input.nextSibling.classList.add("display-none");
    } else {
      console.log("VALOR INCORRECTO");
      //input.value = null
      input.nextSibling.classList.remove("display-none");
      
    }
  }
});

let errors = d.querySelectorAll(".data__error--email");

d.addEventListener("click", (e) => {
  if (e.target.matches(".data__btn")) {
    e.preventDefault();
    //console.log(typeof $imageAvatar.dataset.image)

    if ($imageAvatar.dataset.image === "false") {
      console.log("no hay imagen");
      d.querySelector(".data__error").classList.remove("display-none");
      d.querySelector(".data__warning").classList.add("display-none");
    }

    

  
  }


}); */

/*  d.querySelector(".form").classList.add("display-none")
     d.querySelector(".reply").classList.remove("display-none") */

/* 



 d.querySelector(".form").classList.add("display-none")
          d.querySelector(".reply").classList.remove("display-none")

          $replyName.textContent = d.getElementById("name").value
          $infoName.textContent = d.getElementById("name").value
          $replyEmail.textContent = d.getElementById("email").value
          $infoGit.textContent = d.getElementById("user").value




$inputs.forEach(input => {
        console.log(input.pattern)
        console.log(input.value)
        let pattern = input.pattern

        console.log(pattern)
         
        let regex = new RegExp(pattern)

        if(regex.exec(input.value)) {
          console.log("VALOR CORRECTO")
          input.nextSibling.classList.add("display-none")

          console.log(input)

         

        } else {
          console.log("VALOR INCORRECTO")
          input.nextSibling.classList.remove("display-none")
        }

      })










  if(e.target.matches(`input[autocomplete="off"]`)) {
    let input = e.target,
      pattern = input.pattern

      let regex = new RegExp(pattern)

    console.log(regex)

    if(regex.exec(input.value)) {
      console.log("Correcto")
      input.nextSibling.classList.add("display-none")

    } else {
      console.log("Incorrecto")
      input.nextSibling.classList.remove("display-none")
      console.log(input.value)
    }
    
  } */

/* 

d.addEventListener("click", (e) => {
  if (e.target.matches(".data__btn")) {
    e.preventDefault();
    if ($imageAvatar.dataset.image !== "true") {
      d.querySelector(".data__warning").classList.add("display-none");
      d.querySelector(".data__error").classList.remove("display-none");
    }
  }
});


let error
$inputs.forEach(el => {
  error = `<p class="data__error--email data--error display-none">Please enter a valid ${el.name}</p>`
  el.insertAdjacentHTML("afterend", error)
})

d.addEventListener("change", e => {


  if(e.target.matches(`input[autocomplete="off"]`)) {
    let input = e.target,
      pattern = input.pattern

      let regex = new RegExp(pattern)

    console.log(regex)

    if(regex.exec(input.value)) {
      console.log("Correcto")
      input.nextSibling.classList.add("display-none")

    } else {
      console.log("Incorrecto")
      input.nextSibling.classList.remove("display-none")
      console.log(input.value)
    }
    
  }
})

 */

/* d.getElementById("name").value

console.log($inputs)
let error
$inputs.forEach(el => {
  error = `<p class="data__error--email display-none">Please enter a valid ${el.name}</p>`
  el.insertAdjacentHTML("afterend", error)
})

$btnTicket.addEventListener("click", (e) => {
  e.preventDefault()
  e.stopPropagation()
  
let error
$inputs.forEach(el => {
  error = `<p class="data__error--email display-none">Please enter a valid ${el.name}</p>`
  el.insertAdjacentHTML("afterend", error)
})

  //console.log($imageAvatar.dataset.image)
  if($imageAvatar.dataset.image !== "true") {
    console.log("No Hay imagen")
    d.querySelector(".data__warning").classList.add("display-none");
    d.querySelector(".data__error").classList.remove("display-none");
  } else {
    //console.log("Hay imagen")
    //console.log($inputs)
    $inputs.forEach(el => {
      console.log(el.pattern)

      let regex = new RegExp(el.pattern)
      
      return regex.exec(el.value)
      ? d.querySelector(".data__error--email").classList.add("display-none")
      : d.querySelector(".data__error--email").classList.remove("display-none")
        
    })
  }
  

 


}) */

/* 


error = `<p class="data__error--email">Please enter a valid ${el.name}</p>`
el.insertAdjacentHTML("afterend", error)
/*  let error = ``
   $inputs.forEach(el => {
   
     if(el.value !== ""){
       console.log("Completo")
       console.log("SE IMPRIME LA ENTRADA")
     } else {
       console.log("Vacio")
       el.addEventListener("change", e => {
         console.log(e)
       })
      
     }
   
   }) */

/* $btnTicket.addEventListener("click", (e) => {
  e.preventDefault()
  if(d.querySelector(".data__input--email").value){
    console.log(d.getElementById("name").value)
  
   d.querySelector(".form").classList.add("display-none")
   d.querySelector(".reply").classList.remove("display-none")
  
    $replyName.textContent = d.getElementById("name").value
    $replyEmail.textContent = d.getElementById("email").value
    $infoName.textContent = d.getElementById("name").value
    $infoGit.textContent = d.getElementById("user").value
    $infoContactImage.src = $imageAvatar.src

  } else {
    d.querySelector(".data__input--email").style.marginBottom = "0"
    d.querySelector(".data__error--email").classList.remove("display-none")
    d.querySelector(".data__warning").classList.add("display-none");
    d.querySelector(".data__error").classList.remove("display-none");
  }
})

$btnBack.addEventListener("click", (e => {
  d.querySelector(".form").classList.remove("display-none")
   d.querySelector(".reply").classList.add("display-none")
}))
 */
