// COMP229 Assignment 1 | app.js | Andreas Themistocles | 301251197 | October 3rd, 2022
(function(){
    
    function Start()
    {
        console.log("App started...")

        let deleteButtons = document.querySelectorAll('.delete-button-link')

        for(deleteButton of deleteButtons) {
            deleteButton.addEventListener('click', function(event){
                if(!confirm("Are you sure?")) {
                    event.preventDefault()
                    window.location.assign('/contacts')
                }
            })
        }
    }

    window.addEventListener("load", Start)

})()