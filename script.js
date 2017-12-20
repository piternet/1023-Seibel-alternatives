window.onload = function() {
    var app = new Vue({
        el: '#app',
        data: {
            title: 'Interfejs eksperymentatora',
            startMessageShow: true,
            configurePanelShow: false,
            detailsShow: false,
            inputShow: false,
            nameShow: false,
            trainingSessionInfoShow: false,
            trainingSessionShow: false,
            timeInput: "",
            nameInput: "",
        },
        methods: {
            startConfigure: function(event) {
                this.startMessageShow = false
                this.configurePanelShow = true
            },

            showDetails: function(event) {
                $(".loopback").addClass("disabled");
                $("#"+event.target.id).removeClass('disabled');
                $("#"+event.target.id).addClass('active');
                this.detailsShow = true;
            },

            showInput: function(event) {
                $(".time").addClass("disabled");
                $("#"+event.target.id).removeClass('disabled');
                $("#"+event.target.id).addClass('active');
                this.inputShow = true;
            },

            showName: function(event) {
                this.nameShow = true;
            },

            activateButton: function(event) {
                $("#start_session").removeClass('disabled');
            },

            startSession: function(event) {
                this.configurePanelShow = false;
                this.trainingSessionInfoShow = true;
                this.title = "Sesja treningowa";
            },

            startTraining: function(event) {
                this.trainingSessionInfoShow = false;
                this.trainingSessionShow = true;
            }


        }
    })
}
