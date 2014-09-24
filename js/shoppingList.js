$(document).ready(function(){

//Make List Items sortable
$("#list > ul").sortable({connectWith: ".lists > ul",cursor: "move"}).disableSelection();


//Add Item to List and Clear Input form
$("#addItem").on("click",function(e){
	e.preventDefault();
	var itemToAdd = $("#enterItem input").val();
	var newListItem =  "<li class='test'><div><label><input type='checkbox' class='cbox'> Mark As Complete </label><div class='testItem'>" 
						+ itemToAdd + "</div><span class='remove'>Remove</span></div></li>";
	$("#list ul").prepend(newListItem);
	$("#enterItem input").val(" ").focus();
});

//Fadeout Removed Items List if empty
var lilengthArr = 0;
function removedItemsListFade(){
	if(lilengthArr === 0){
		$("#removedItems").fadeOut(1000);
			};
	};

//Remove Item from List and Add to Removed Iems List
$(".lists").on("click",".remove",function(){
	
	lilengthArr++;
	var listItem = $(this).parent().parent();
	
	$(listItem).fadeOut("fast",function(){
		$(this).detach().prependTo("#removedItems ul").fadeIn("slow");
		$("#removedItems").fadeIn("fast");
		$(this).find(".remove").text("Add Back To List");
		$(this).find("span").removeClass("remove").addClass("addBack");
		});
	});
	
//Add Back to Main List
$(".lists").on("click",".addBack",function(){

	lilengthArr--;
	var listItem = $(this).parent().parent();
	
	$(listItem).fadeOut("fast",function(){
		$(this).detach().prependTo("#list ul").fadeIn("slow");
		$(this).find(".addBack").text("Remove");
		$(this).find("span").removeClass("addBack").addClass("remove");	
		});
	
	removedItemsListFade();
	});

//Mark as Complete
$(".lists").on("change","input.cbox",function(){
	$(this).parent().siblings("div.testItem").toggleClass("strike");
	});

//New List
$("#newList").click(function(e){
	e.preventDefault();
	lilengthArr = 0;
	$(".test").remove();
	removedItemsListFade();
	});	

});