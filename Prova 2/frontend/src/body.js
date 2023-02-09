$.post('../../p1/src/main/Java/servlet/ServiceData.java', {
    category:'client', type:'premium'
}).done(function(response){
    alert("success");
    $("#mypar").html(response.amount);
})
