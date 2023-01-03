const container = document.querySelector(".container");
const addQuestionCard = document.querySelector("add-question-card");
const cardButton = document.querySelector("save-btn");
const question = document.querySelector("question");
const answer = document.querySelector("answer");
const errorMessage = document.querySelector("error");
const addQuestion = document.querySelector("add-flashcard");
const closeBtn = document.querySelector("close-btn");
let editBool = false;

//Add question when user clicks 'Add flashcard' button
addQuestion.addEventListener('click', () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
});

//Hide create flashcard card
closeBtn.addEventListener(
    "click",
    (hideQuestion = () => {
      container.classList.remove("hide");
      addQuestionCard.classList.add("hide");
      if (editBool) {
        editBool = false;
        submitQuestion();
      }
    })
);

//Submit question
cardButton.addEventListener('click', (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hide");
    } else {
        container.classList.remove("hide");
        errorMessage.classList.add('hide');
        viewList();
        question.value = "";
        answer.value = "";
    }
})
);

//Card Generate
function viewList() {
    var listCard = document.getElementsByClassName("card-list-container");
    var div = document.createElement("div");
    div.classList.add("card");
    //Question
    div.innerHTML += `<p class="question-div">${question.value}</p>`
    //Answer
    var displayAnswer = document.createElement("p");
    displayAnswer.className.add("answer-div", "hide");
    displayAnswer.innerText = answer.value;

    //link to show/hide answer
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hide")
    });

    //Edit button
    let buttonsCon = document.createElement("div");
    buttonsCon.classList.add("buttons-con");
    var ediButton = document.createElement("button");
    ediButton.setAttribute("class", "edit");
    ediButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    ediButton.addEventListener("click", () => {
        editBool = true;
        modifyElement(ediButton, true);
        addQuestionCard.classList.remove("hide");
    });
    buttonsCon.appendChild(ediButton);
    disableButtons(false);

    //Delete buttons
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    buttonsCon.appendChild(deleteButton);

    div.appendChild(buttonsCon);
    listCard[0].appendChild(div);
    hideQuestion();
};

//Modify elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
    if (edit) {
        let parentAns = parentDiv.querySelector(".answer-div").innerText;
        answer.value = parentAns;
        question.value = parentQuestion;
        disableButtons();
    }
    parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = value;
    });
};
