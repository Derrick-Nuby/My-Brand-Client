document.addEventListener('DOMContentLoaded', function () {
    // Use document.querySelector to select elements based on class names
    const bars = document.querySelector('.bars');
    const menu = document.querySelector('.menu');

    // Add an event listener to the bars element
    bars.addEventListener('click', function () {
        // Toggle the visibility of the menu
        menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'flex' : 'none';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const replyButtons = document.querySelectorAll(".reply-btn");

    replyButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const commentDiv = button.closest(".basecomment");
            injectReplyForm(commentDiv);
        });
    });

    function injectReplyForm(commentDiv) {
        // Create the reply form HTML
        const replyFormHTML = `
            <div class="replycommentform">
                <form action="" class="formcontact">
                    <label for="comment">Reply to The above Comment:</label>
                    <textarea name="comment" cols="100" rows="10"></textarea>
                    <input type="hidden" id="parentCommentId" name="commentId">
                    <input type="submit" value="Comment Reply" id="replycommentbtn">
                </form>
            </div>
        `;

        // Create a new div element to hold the reply form
        const replyFormContainer = document.createElement("div");
        replyFormContainer.innerHTML = replyFormHTML;

        // Append the reply form below the comment
        commentDiv.parentNode.insertBefore(replyFormContainer, commentDiv.nextSibling);

        const replycommentbtn = replyFormContainer.querySelector('#replycommentbtn');
        replycommentbtn.addEventListener('click', function(event) {
            event.preventDefault();
            const replyForm = document.querySelector('.replycommentform');

    // Check if the replycommentform exists
    if (replyForm) {
        // Remove the replycommentform from the DOM
        replyForm.parentNode.removeChild(replyForm);
    }
        });
    }
});