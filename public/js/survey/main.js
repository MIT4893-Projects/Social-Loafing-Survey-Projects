function createElementWithClasses(elem, classes, innerText) {
    var elem_ = document.createElement(elem);

    if (innerText) {
        elem_.innerText = innerText;
    }

    for (cls of classes.split(" ")) {
        if (cls)
            elem_.classList.add(cls);
    }

    return elem_;
}

function createSurveyQuestion(question_form) {
    var card_element = createElementWithClasses("div", "card h-100 rounded-1_5rem shadow-lg my-3");
    card_element.appendChild(createElementWithClasses("div", "card-header"))

    var card_body = createElementWithClasses("div", "card-body pt-1");
    card_element.appendChild(card_body);

    var question_node = createElementWithClasses("h5", "", question_form.question_prefix + question_form.question);
    card_body.appendChild(question_node);

    var choices_node = createElementWithClasses("div", "m-0");
    var other_choice_input_id = "";
    if (question_form.other_choice != null) {
        other_choice_input_id = question_form.name + "-other-choice";
    }

    if (question_form.type == "single-choice") {
        for ([index, choice] of question_form.choices.entries()) {
            var div_elem = createElementWithClasses("div", "form-check");

            var radio_elem = createElementWithClasses("input", "form-check-input");
            radio_elem.type = "radio";
            radio_elem.name = question_form.name;
            radio_elem.id = question_form.name + choice;

            radio_elem.addEventListener("click", function () { changeOtherChoiceRadioInputState(question_form.name + "-other-choice", true) });

            var radio_label = createElementWithClasses("label", "form-check-label", choice);
            radio_label.htmlFor = question_form.name + choice;

            div_elem.appendChild(radio_elem);
            div_elem.appendChild(radio_label);

            if (index == question_form.other_choice) {
                radio_elem.addEventListener("click", function () { changeOtherChoiceRadioInputState(question_form.name + "-other-choice", false) });
                var input_other_choice_elem = createElementWithClasses("input", "form-control");
                input_other_choice_elem.id = question_form.name + "-other-choice";
                input_other_choice_elem.disabled = true;
                div_elem.appendChild(input_other_choice_elem);
            }

            choices_node.appendChild(div_elem);
        }

    } else if (question_form.type == "multiple-choices") {
        for ([index, choice] of question_form.choices.entries()) {
            var div_elem = createElementWithClasses("div", "form-check");

            var checkbox_elem = createElementWithClasses("input", "form-check-input");
            checkbox_elem.type = "checkbox";
            checkbox_elem.name = question_form.name;
            checkbox_elem.id = question_form.name + choice;

            var radio_label = createElementWithClasses("label", "form-check-label", choice);
            radio_label.htmlFor = question_form.name + choice;

            div_elem.appendChild(checkbox_elem);
            div_elem.appendChild(radio_label);

            if (index == question_form.other_choice) {
                checkbox_elem.addEventListener("click", function() {changeOtherChoiceCheckInputState(other_choice_input_id, checkbox_elem.name + choice)});
                var input_other_choice_elem = createElementWithClasses("input", "form-control");
                input_other_choice_elem.id = question_form.name + "-other-choice";
                input_other_choice_elem.disabled = true;
                div_elem.appendChild(input_other_choice_elem);
            }

            choices_node.appendChild(div_elem);
        }
    }
    card_body.appendChild(choices_node);

    return card_element;
}

function changeOtherChoiceRadioInputState(id, state) {
    document.getElementById(id).disabled = state;
}

function changeOtherChoiceCheckInputState(id, checkbox_id) {
    document.getElementById(id).disabled = !document.getElementById(checkbox_id).checked;
}

var json_data = JSON.parse(
    `
    [
        {
            "question_prefix": "Câu 1: ",
            "question": "Bạn có cảm thấy bản thân thích được làm việc nhóm không? (Chọn theo mức độ)",
            "type": "single-choice",
            "name": "Q1",
            "choices": [
                1,
                2,
                3,
                4,
                5
            ],
            "other_choice": null,
            "require": true
        },
        {
            "question_prefix": "Câu 2: ",
            "question": "Tần suất giáo viên giao bài tập làm việc nhóm ở trường (lớp) của bạn?",
            "type": "single-choice",
            "name": "Q2",
            "choices": [
                "Không, mình không có công việc nhóm nào được giao (bởi giáo viên).",
                "Có, tuy vậy giáo viên cho làm rất ít.",
                "Có, giáo viên cho giao bài tập làm việc nhóm thường xuyên.",
                "Có, cho mình làm rất nhiều trong một khoảng thời gian ngắn.",
                "Mục khác:"
            ],
            "other_choice": 4,
            "require": true
        },
        {
            "question_prefix": "Câu 3: ",
            "question": "Bạn có cảm thấy bản thân kém năng suất hơn khi làm việc nhóm so với khi làm một mình không?",
            "type": "single-choice",
            "name": "Q3",
            "choices": [
                "Có, nhưng rất hiếm.",
                "Có, mình luôn cảm thấy bản thân bỏ ít năng suất hơn khi làm việc nhóm.",
                "Không, mình đều rất năng suất cả khi làm việc cá nhân lẫn việc nhóm.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 4: ",
            "question": "Ngoài ra, bạn có hay chứng kiến hay cảm thấy người khác kém năng suất hơn khi làm việc bao giờ chưa?",
            "type": "single-choice",
            "name": "Q4",
            "choices": [
                "Có, tuy vậy không nhiều.",
                "Có, rất nhiều.",
                "Không, mình chưa bao giờ chứng kiến.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 5: ",
            "question": "Bạn nghĩ bản thân có hiểu biết rõ về hiện tượng 'Social loafing' (lười biếng xã hội)?",
            "type": "single-choice",
            "name": "Q5",
            "choices": [
                "Có, mình hiểu rất rõ.",
                "Có, nhưng có vài chỗ mình không biết.",
                "Xin lỗi, mình chỉ vừa mới được biết sơ qua về hiện tượng này qua đường link được đính kèm trong form.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 6: ",
            "question": "Bạn biết hiện tượng 'Social loafing' (lười biếng xã hội) qua:",
            "type": "multiple-choices",
            "name": "Q6",
            "choices": [
                "Mạng xã hội (Facebook, Instagram,...).",
                "Qua sách vở, tuyên truyền,...",
                "Được bạn bè phổ cập đến.",
                "Mình vừa mới được biết về hiện tượng này qua đường link được đính kèm trong form.",
                "Mục khác:"
            ],
            "other_choice": 4,
            "require": true
        },
        {
            "question_prefix": "Câu 7: ",
            "question": "Bạn nghĩ như thế nào về mức độ phổ biến của hiện tượng 'Social loafing' (lười biếng xã hội) ở môi trường Trung học cơ sở?",
            "type": "single-choice",
            "name": "Q7",
            "choices": [
                "Mình chưa bao giờ thấy xuất hiện ở trường mình.",
                "Có xuất hiện nhưng không quá phổ biến.",
                "Có xuất hiện và rất phổ biến.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 8: ",
            "question": "Bạn có bao giờ cảm thấy bản thân mắc phải 'Social loafing' (lười biếng xã hội) không?",
            "type": "single-choice",
            "name": "Q8",
            "choices": [
                "Chưa, mình cảm thấy bản thân chưa mắc phải 'Social loafing' (lười biếng xã hội).",
                "Có, nhưng không nhiều.",
                "Có, rất nhiều lần.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 9: ",
            "question": "Khi bạn nghĩ rằng bản thân bị mắc phải 'Social loafing' (lười biếng xã hội), bạn sẽ làm gì?",
            "type": "single-choice",
            "name": "Q9",
            "choices": [
                "Mặc kệ và không đóng góp vào việc làm nhóm.",
                "Vẫn làm việc nhóm nhưng chỉ làm cho có để lấy điểm.",
                "Cố gắng thoát khỏi 'Social loafing' (lười biếng xã hội) và đóng góp nhiều nhất có thể cho nhóm.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 10: ",
            "question": "Nếu bạn gặp một người bị ảnh hưởng bởi 'Social loafing' (lười biếng xã hội) thì bạn sẽ:",
            "type": "multiple-choices",
            "name": "Q10",
            "choices": [
                "Góp ý với người đó.",
                "Làm lơ, không quan tâm và coi như không biết.",
                "Báo cáo với giáo viên để xử lý thành viên ấy.",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        },
        {
            "question_prefix": "Câu 11: ",
            "question": "Theo bạn, nguyên nhân dẫn đến xảy ra hiện tượng 'Social loafing' (lười biếng xã hội) là gì?",
            "type": "multiple-choices",
            "name": "Q11",
            "choices": [
                "Do thành viên nhóm thiếu động lực để làm phần việc được phân chia.",
                "Do thành viên nhóm quá bận rộn nên mới xảy ra hiện tượng.",
                "Do sự phân chia từ một hay nhiều thành viên không hợp lý.",
                "Vì một hoặc một số thành viên trong nhóm được đề cao hơn so với những người còn lại dẫn đến việc phần lớn công việc bị dồn vào một hoặc một số người.",
                "Do quá nhiều thành viên trong cùng một nhóm dẫn đến việc các thành viên ỷ lại.",
                "Mục khác:"
            ],
            "other_choice": 5,
            "require": true
        },
        {
            "question_prefix": "Câu 12: ",
            "question": "Bạn nghĩ hậu quả mà hiện tượng 'Social loafing' (lười biếng xã hội) mang lại trong đời sống, đặc biệt là môi trường Trung học cơ sở là gì?",
            "type": "multiple-choices",
            "name": "Q12",
            "choices": [
                "Gây mất đoàn kết trong lớp học.",
                "Người không làm gì cũng được hưởng lợi từ những người đã làm nhiều hơn/ làm giúp mình, dẫn tới không công bằng trong việc chấm điểm số.",
                "Gây nản chí mỗi khi làm việc nhóm.",
                "Cản trở việc thể hiện năng lực của học sinh.",
                "Mục khác:"
            ],
            "other_choice": 4,
            "require": true
        },
        {
            "question_prefix": "Câu 13: ",
            "question": "Vậy, theo bạn thì những biện pháp nào để ngăn chặn việc 'Social loafing' (lười biếng xã hội) xảy ra?",
            "type": "multiple-choices",
            "name": "Q13",
            "choices": [
                "Lên tiếng khi thấy có người đùn đẩy công việc cho người khác; lười biếng khi làm việc nhóm.",
                "Tạo ra các nhóm nhỏ và phân chia trách nhiệm cho từng cá nhân rõ ràng.",
                "Tạo động lực chung rõ ràng giúp mọi người cùng nhau nỗ lực làm việc",
                "Mục khác:"
            ],
            "other_choice": 3,
            "require": true
        }
    ]
    `
)

for (question_form of json_data) {
    document.getElementById("survey-form").appendChild(createSurveyQuestion(question_form));
}