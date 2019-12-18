
$(function(){
    var d1 = [];
    var x = [];
    console.log("before chart request");
    let token = localStorage.getItem('token');
    $.ajax({
      url: "http://127.0.0.1:8080/manager_client/chart",
      type: "GET",
      beforeSend: function(xhr){
        xhr.setRequestHeader(
          'Content-type','application/json'
        );
        xhr.setRequestHeader('Accept' , 'application/json');
        xhr.setRequestHeader(
          'Authorization' , 'Bearer ' + token.substring(1,token.length-1)
      );
      },
      success: (result) => {
        console.log(result);
        x = result;
        var ta = [];
        for(var i = 0; i<12;i++){
          ta[i] = 0;
        }
        console.log("result.length",result.users.length);
        for(var j = 0;j < result.users.length ; j++){
          console.log(result.users[j].createdDate[1]);
          ta[result.users[j].createdDate[1]-1] ++;
        }
        console.log('tableau' , ta);
        for (var i = 0; i <= 12; i += 1) {
          d1.push([i, ta[i]]);
        }
        var data = [];
        data.push({
          data:d1,
          bars: {
            show: true,
            barWidth: .9,
            order: 1,
          }
        });

        //Display graph
        var bar = $.plot($(".bars"), data, {
          legend: true,
          color: "#2b2b2b"
        });
      }
    });

});

