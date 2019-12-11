var app = new Vue({
    el: '#app',
    data: {
        teamName: '',
        playerName: '',
        playerPosition: '',
        playerRating: '',
        team: {
            teamName: '',
            players: []
        }
    },
    created: function() {
        
    },
    methods: {
        changeName() {
            this.team.teamName = this.teamName;
            this.teamName = '';
        },
        async findTeam() {
            console.log("In findTeam()");
            this.team.teamName = this.teamName; 
            var url = "http://ddrowley.com:3000/player/" + this.team.teamName;
            try {
                let response = await axios.get(url);
                this.team.players = response.data;
                console.log(this.team);
            }
            catch(error) {
                console.log(error);
            }
            
        },
        addPlayer() {
            console.log("In addPlayer()");
            console.log(this.playerName);
            var url = "http://ddrowley.com:3000/player";
            axios.post(url, {
                teamName: this.team.teamName,
                name: this.playerName,
                position: this.playerPosition,
                rating: this.playerRating
            })
            .then(response => {
                console.log(response.data);
                this.team.players.push(response.data);
            });
            this.playerName = '';
            this.playerRating = '';
        }, 
        deletePlayer(player) {
            console.log("In deletePlayer()");
            var url = "http://ddrowley.com:3000/player/" + player._id;
            axios.delete(url)
            .then(response => {
                this.teamName = this.team.teamName;
                this.findTeam();
            });
        }
    }
});
