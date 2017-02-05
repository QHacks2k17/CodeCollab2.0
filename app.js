/**
 * Created by Awesome-Tbee on 2/4/2017.
 */

var a = '<div id="myModal" class="modal fade" role="dialog">'+  '<div class="modal-dialog">'+

'<div class="modal-content">' +
    '<div class="modal-header">'+
    '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title">Modal Header</h4>'+
'</div>'+
'<div class="modal-body">'+
    '<p>Some text in the modal.</p>'+
'</div>'+
'<div class="modal-footer">'+
    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
    '</div>'+
    '</div>'+

    '</div>'+
    '</div>'

var dialogMember = '<div class="modal-dialog">'
        + '<div class="modal-content">'
            + '<div class="modal-header">'
                +'<button id="close" type="button" class="close" data-dismiss="modal">&times;</button> <h3 class="modal-title">ENTER</h3>'
            +'</div>'

            +'<div class="modal-body">'
                +'<p>Enter Email</p>'
                +'<input id="email" type="email" placeholder="Email">'
            +'</div>'

            +'<div class="modal-footer">'
                +'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'</div>'

        +'</div>'
        +'</div>'

$('#addMember').on('click', function () {
    $('#modal').append(a)
})