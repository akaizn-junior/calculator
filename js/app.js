//demo joel calculator
(function() {

    let screen = {
        readonly: false,
        maxlength: 20
    };

    let joel = Joel({
        screen: screen
    }); 

    let jscreen = document.getElementById('joel-screen');
    jscreen.placeholder = 'joel -o-o';

})();
