// attach our handlers until the DOM is fully loaded.
$(function () {

    $(".change-devour").on("click", function(event) {
        var id = $(event.currentTarget).data("id");
        var newDevour = $(event.currentTarget).data("newdevour");
  
        var newDevourState = {
            devoured: newDevour
        };
  
        $.ajax("/api/burgers/" + id, {
                type: "PUT",
                data: newDevourState
            })
            .then(function(){
                console.log("changed devoured to", newDevour);
  
                location.reload();
            });
    });
  
    $('.create-form').on('submit', function(event){
        event.preventDefault();
  
        var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: 1
  
        };
  
        $.ajax("/api/burgers", {
                type: 'POST',
                data: newBurger
            })
            .then(
               function() {
                    console.log("new burger created");
  
                    location.reload();
                }
            );
  
    });
  });