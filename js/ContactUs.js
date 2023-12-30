//validate name
function validateName() {
    var name = document.getElementById("name");
    var nameError = document.getElementById("nameError");
    nameError.innerHTML = "";
    if (name.value.trim() === "" || !/^[a-zA-Z\s]*$/.test(name.value.trim()) || name.value.trim().length < 3) {
        nameError.innerHTML = "الرجاء إدخال اسم صحيح (أكثر من 3 أحرف وبدون أرقام)";
        nameError.style.color = "red";
        return false;
    } else {
        return true;
    }
}



function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailErorr");
    emailError.innerHTML = "";
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.innerHTML = 'الرجاء إدخال عنوان بريد إلكتروني صحيح (مثال: example@example.com)';
        emailError.style.color = "red";
        return false;
    }
    else {
        return true;
    }

}


function validatePhoneNumber() {
    var phoneNumber = document.getElementById("number").value;
    var phoneError = document.getElementById("phoneError");
    phoneError.innerHTML = "";
    var regex = /^(010|011|012)\d{8}$/;
    if (!regex.test(phoneNumber)) {
        phoneError.innerHTML = 'الرجاء إدخال رقم هاتف مصري صحيح (مثال: 01012345678)';
        phoneError.style.color = "red";
        return false;
    } else {
        return true;
    }
}


function validateMessage() {
    var message = document.getElementById("message");
    var messageError = document.getElementById("messageError");
    messageError.innerHTML = "";

    if (message.value.trim() === "") {
        messageError.innerHTML = "يرجى إدخال رسالتك قبل الإرسال";
        messageError.style.color = "red";
        return false;
    } else {
        return true;
    }
}
submitBtn.addEventListener("click", function (event) {
    if (validateName() && validateEmail() && validatePhoneNumber() && validateMessage()) {
        window.open("thanks_order.html");
    }
    else {
        validateName();
        validateEmail();
        validatePhoneNumber();
        validateMessage();

    }
    event.preventDefault();
})


var mybutton = document.getElementById("scrollToTopBtn");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}
