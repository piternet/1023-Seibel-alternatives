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
            bulbs: [
                {id: 'b1', class: 'nb'},
                {id: 'b2', class: 'nb'},
                {id: 'b3', class: 'nb'},
                {id: 'b4', class: 'nb'},
                {id: 'b5', class: 'nb'},
                {id: 'b6', class: 'nb'},
                {id: 'b7', class: 'nb'},
                {id: 'b8', class: 'nb'},
                {id: 'b9', class: 'nb'},
                {id: 'b10', class: 'nb'},
            ]
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

            setRandomBulbs: function() {
                this.bulbs.forEach(
                    function(item) {
                        let random = Math.floor((Math.random() * 2) + 1);
                        if(random == 1)
                            item.class = 'ab';
                    }
                );
            },

            startTraining: function(event) {
                this.trainingSessionInfoShow = false;
                this.trainingSessionShow = true;
                this.setRandomBulbs();
            }


        }
    })
}
