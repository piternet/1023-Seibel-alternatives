

let keyIndexes = {
    65: 0,
    83: 1,
    68: 2,
    70: 3,
    71: 4,
    72: 5,
    74: 6,
    75: 7,
    76: 8,
    186: 9
};

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

window.onload = function() {
    const TRAINING_SESSIONS = 2;
    var app = new Vue({
        el: '#app',
        data: {
            title: 'Interfejs eksperymentatora',
            infoTitle: "",
            startMessageShow: true,
            configurePanelShow: false,
            detailsShow: false,
            inputShow: false,
            nameShow: false,
            trainingSessionInfoShow: false,
            trainingSessionShow: false,
            properSessionShow: false,
            endInfoShow: false,
            timeInput: "",
            nameInput: "",
            loopback: false,
            constantTime: false,
            trainingCounter: 1,
            properCounter: 1,
            subsets: [],
            timesToClick: [],
            trainingInterval: null,
            secondsInterval: null,
            startTime: null,
            time: null,
            secondsElapsed: 0,
            paused: false,
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
            allBulbsOff: function() {
                for(let i=0; i<this.bulbs.length; i++) {
                    if(this.bulbs[i].class == 'ab')
                        return false;
                }
                return true;
            },

            startPause: function() {
                this.paused = true;
            },

            stopPause: function() {
                this.paused = false;
            },

            startConfigure: function(event) {
                this.startMessageShow = false
                this.configurePanelShow = true
            },

            loopbackClicked: function(event) {
                this.loopback = true;
                this.showDetails(event);
            },

            noLoopbackClicked: function(event) {
                this.loopback = false;
                this.showDetails(event);
            },

            showDetails: function(event) {
                $(".loopback").addClass("disabled");
                $("#"+event.target.id).removeClass('disabled');
                $("#"+event.target.id).addClass('active');
                this.detailsShow = true;
            },

            constantTimeClicked: function(event) {
                this.constantTime = true;
                this.showInput(event);
            },

            changeTimeClicked: function(evnet) {
                this.constantTime = false;
                this.showInput(event);
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
                this.title = "Informacje wstępne";
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

            setNextBulbs: function() {
                let index = this.properCounter-1;
                for(let i=0; i<10; i++) {
                    if(this.subsets[index][i] == '1')
                        this.bulbs[i].class = 'ab';
                    else
                        this.bulbs[i].class = 'nb';
                }
                this.time = new Date();
            },

            newTrainingRound: function() {
                if(this.trainingCounter == TRAINING_SESSIONS) {
                    alert("Koniec sesji treningowej. Rozpoczynamy właściwą sesję.");
                    clearInterval(this.trainingInterval);
                    this.startProperSession();
                }
                else {
                    this.trainingCounter += 1;
                    this.title = "Sesja treningowa (" + this.trainingCounter.toString() + "/" + TRAINING_SESSIONS.toString() + ")";
                    this.setRandomBulbs();
                }
            },

            startTraining: function(event) {
                this.trainingSessionInfoShow = false;
                this.trainingSessionShow = true;
                this.title = "Sesja treningowa (" + this.trainingCounter.toString() + "/" + TRAINING_SESSIONS.toString() + ")";
                this.setRandomBulbs();
                if(this.constantTime) {
                    this.trainingInterval = setInterval(function() {
                        app.newTrainingRound();
                    }, this.timeInput);
                }
            },

            endSession: function() {
                clearInterval(this.secondsInterval);
                this.properSessionShow = false;
                this.trainingSessionShow = false;
                this.title = 'Koniec';
                this.endInfoShow = true;
            },

            newProperRound: function() {
                if(this.properCounter == 1024) {
                    this.endSession();
                }
                else {
                    let diff = (new Date() - this.time)/1000;
                    this.timesToClick.push(diff.toString() + " s");
                    console.log(diff + ' s');
                    this.properCounter += 1;
                    this.infoTitle = "Sesja eksperymentalna (" + this.properCounter.toString() + "/1023)";
                    this.setNextBulbs();
                }
            },

            startProperSession: function() {
                this.infoTitle = "Sesja eksperymentalna (" + this.properCounter.toString() + "/1023)";
                this.title = "";
                console.log(this.title);
                this.properSessionShow = true;
                this.trainingSessionShow = false;
                this.startTime = new Date();
                this.time = new Date();
                for(let i=1; i<1024; i++) {
                    let binary = i.toString(2);
                    while(binary.length < 10) {
                        binary = '0' + binary;
                    }
                    this.subsets.push(binary);
                }
                this.subsets = shuffle(this.subsets);
                this.setNextBulbs();
                this.secondsInterval = setInterval(function() {
                    if(!this.paused)
                        this.secondsElapsed += 1;
                }, 1000);

                if(this.constantTime) {
                    setInterval(function() {
                        app.newProperRound();
                    }, this.timeInput);
                }
            },

            downloadResults: function(event) {
                let rows = [[this.nameInput, this.startTime.toString(), new Date().toString(), this.secondsElapsed.toString()], 
                             this.subsets.slice(0, this.properCounter-1), this.timesToClick];
                console.log(rows);
                let csvContent = "data:text/csv;charset=utf-8,";
                rows.forEach(function(rowArray){
                   let row = rowArray.join(",");
                   csvContent += row + "\r\n"; // add carriage return
                }); 
                var encodedUri = encodeURI(csvContent);
                window.open(encodedUri);
            },

        }
    })
    $('body').on('click', '#endSession', function() { app.endSession(); })

    $('body').on('click', '#stopPause', function() { app.stopPause(); })

    window.onkeyup = function(event) {
        let key = event.keyCode ? event.keyCode : event.which;

        if(app.trainingSessionShow || app.properSessionShow) {
            if(key == 80) {
                // pause
                app.startPause();
                let title = app.properCounter ? app.infoTitle : app.title;
                $('#myModalBody').html('<p>' + title + '</p>' + $('#myModalBody').html());
                $('#myModal').modal('toggle');
            }
            if(app.loopback && key in keyIndexes && app.bulbs[keyIndexes[key]].class == 'nb') {
                let audio = new Audio('error.mp3');
                audio.play();
            }
            if(key in keyIndexes && !app.constantTime) {
                setTimeout(function() {
                    app.bulbs[keyIndexes[key]].class = 'nb';
                    if(app.allBulbsOff()) {
                        setTimeout(function() {
                            if(app.trainingSessionShow)
                                app.newTrainingRound();
                            else if(app.properSessionShow)
                                app.newProperRound();
                        }, 200);
                    }
                }, app.timeInput); 
            }

            if(key in keyIndexes & app.constantTime) {
                app.bulbs[keyIndexes[key]].class = 'nb';
            }
        }
    }
}

