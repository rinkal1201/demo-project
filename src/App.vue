<template>
<div>
    <h3>Sort Score by:
        <button @click="sortLowest" class="btn btn-secondary">Least Scored</button>
        <button @click="sortHighest" class="btn btn-secondary" style="margin-left:10px;">Most Scored</button>
    </h3>
    <input type="date" v-model="startDate">
    <input type="date" v-model="endDate">
    <table class="table">
        <thead class="thead-light">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Image</th>
                <th scope="col">Twubric Score </th>
                <th scope="col">Friends</th>
                <th scope="col">Influence</th>
                <th scope="col">Chirpiness</th>
                <th scope="col">Join Date</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(i, key) in filteredData" :key='key'>
                <td>{{i.uid}}</td>
                <td>{{i.username}}</td>
                <td><img :src="i.image" height="30" width="30" /></td>
                <td>{{i.twubric.total}}</td>
                <td>{{i.twubric.friends}}</td>
                <td>{{i.twubric.influence}}</td>
                <td>{{i.twubric.chirpiness}}</td>
                <td>{{moment(i.join_date).format('YYYY-MM-DD')}}</td>
                <td><button class="btn btn-xs btn-danger" @click="deleteEvent(key)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment'; //For date formate.

export default {
    name: 'App',
    data() {
        return {
            posts: "",
            startDate: null,
            endDate: null,
        }
    },

    methods: {
        async getData() { // For get data api.
            try {
                const response = await this.$http.get(
                    "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
                );
                this.posts = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        deleteEvent(key) { // For remove data.
            this.posts.splice(key, 1);
        },

        sortLowest() {
            this.posts.sort((a, b) => a.total > b.total ? 1 : -1); // For lowest data sort.
        },

        sortHighest() {
            this.posts.sort((a, b) => a.total < b.total ? 1 : -1); // For Height data sort.
        },
    },
    computed: {
        filteredData() { // For data filterd by date.
            var startDate = this.startDate;
            var endDate = this.endDate;
            return _.filter(this.posts, (function (posts) {
                if ((_.isNull(startDate) && _.isNull(endDate))) {
                    return true
                } else {
                    var date = moment(posts.join_date).format('YYYY-MM-DD')
                    return (date >= startDate && date <= endDate);
                }
            }))
        },
    },

    mounted() {
        this.getData();
    }
}
</script>

<style scoped>
    </style>
