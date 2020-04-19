<template>

    <div>
      <main role="main">

        <section class="jumbotron text-center" style="margin-bottom: 0rem;">
          <div class="container">
              <div class="form-inline" style="width: 40%; margin-left: auto; margin-right: auto;">
                <center>
                <h1>Instagram videos</h1>
                <p class="lead text-muted">Search Instagram videos.</p>
                <br/>
                <input type="text" class="form-control form-control-lg" placeholder="#blijfinuwkot" v-model="hashtag" />
                <button @click="search" class="btn btn-primary mb-2" style="margin-top: 5px; margin-left: 10px; font-size: 1.25rem; line-height: 1.5; border-radius: 0.3rem;">Search</button>
              </center>
              </div>
          </div>
        </section>

        <div class="album py-5 bg-light" style="min-height: 70vh;">
          <div class="container">

            <div style="width: 100%; margin-bottom: 20px; height: 50px;">
            <div style="float: right">
              <span>{{data.length}} showing</span> ·
              <span>{{count}} result</span>
          </div>
          <div style="float: left">


            <div v-if="debug">
              <span>Last Cursor: {{last_cursor}}</span><br/>
              <span>URL: {{url}}</span><br/>
            </div>

            <div>
              <!--
              <div style="float: left">
                <button v-if="!debug" @click="debug=true" class="btn btn-primary">Show debug</button>
                <button v-else @click="debug=false" class="btn btn-primary">Hide debug</button>
              </div>
            -->

            <div style="float: left">
              <select class="form-control" v-model="contentType">
                <option value="all">Images & videos</option>
                <option value="image">Only images</option>
                <option value="video">Only videos</option>
              </select>
            </div>
            <div style="float: left; margin-left: 5px;">
              <button @click="search" class="btn btn-primary">Load more</button>
            </div>
            </div>
          </div>
        </div>


            <div v-if="data && data.length > 0">

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-4" v-for="post in data" v-bind:key="post.id">
                <div class="card mb-4 shadow-sm" style="cursor: pointer;" @click="openUrl('https://www.instagram.com/p/'+post.shortcode+'/')">
                  <img class="bd-placeholder-img card-img-top" height="293px" width="293px" :src="post.thumbnail_src" />
                  <div class="card-body">
                    <p class="card-text">{{truncate(post.edge_media_to_caption.edges[0].node.text)}}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="text-muted">
                        <span>
                          <span v-if="post.is_video">VIDEO</span>
                          <span v-else>IMAGE</span>
                        </span> ·
                        <span>{{post.edge_liked_by.count}} Likes</span> ·
                        <span>{{moment(post.taken_at_timestamp * 1000).format('DD/MM/YYYY HH:mm:ss')}}</span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div v-else-if="message">
            <br/>
            <center>
            {{message}}
          </center>
          </div>

            <div v-else>
              <br/>
              <center>
              No data found. Please try a query.
            </center>
            </div>

        </div>
        </div>

      </main>
    </div>

</template>
<script>
const axios = require('axios');

export default {
  data: function() {
    return {
      hashtag: '#blijfinuwkot',
      lastHashtag: '',
      results: {},
      count: 0,
      rawdata: [],
      message: '',
      last_cursor: false,
      debug: false,
      url: '',
      contentType: 'all'
    }
  },
  methods: {
    truncate: function(str){
      return str.slice(0, 140)
    },
    openUrl: function(url){
      window.open(url, '_blank');
    },
    search: function(){
      console.log(this.hashtag);
      this.url = "https://www.instagram.com/explore/tags/"+this.hashtag.replace('#', '')+"/?__a=1";
      if(this.last_cursor){
        this.url += ("&max_id="+this.last_cursor)
      }

      console.log('URL:', this.url);


      const _self = this;
      this.lastHashtag = this.hashtag;
      // GET request for remote image
      axios({
        method: 'get',
        url: _self.url,
        responseType: 'json',
        // headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'}
      }).then(function (response) {
        _self.message = "";
        if(response && response.data){
          console.log(response.data);
          const data = response.data;
          _self.count = data.graphql.hashtag.edge_hashtag_to_media.count;
          for (var i = 0; i < data.graphql.hashtag.edge_hashtag_to_media.edges.length; i++) {
            _self.rawdata.push(data.graphql.hashtag.edge_hashtag_to_media.edges[i])
          }

          if(data.graphql.hashtag.edge_hashtag_to_media && data.graphql.hashtag.edge_hashtag_to_media.page_info && data.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page){
            _self.last_cursor = data.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor;
          } else {
            _self.last_cursor = "NOT FOUND";
          }

          axios({
            method: 'post',
            url: '/v1/hashtag',
            data: data.graphql.hashtag
          }).then((response) => {
            console.log(response.data);
          }, (error) => {
            console.log(error);
          });

        } else {
          console.log('WTF')
        }
      }).catch(function (error) {
        if(error && error.response){
          console.log('ERROR ERROR ERROR');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          _self.message = "Parsing from Instagram wasn't possible. We'll retry in 1 second."
          setTimeout(function(){
            _self.search();
          }, 2000);
        }
      });

    }
  },
  computed: {
    data: function(){
      const array = [];
      for (var i = 0; i < this.rawdata.length; i++) {
        const post = this.rawdata[i].node;
        if(this.contentType == 'all'){
          array.push(post);
        } else if(this.contentType == 'video'){
          if(post.is_video){
            array.push(post);
          }
        } else if(this.contentType == 'image'){
          if(!post.is_video){
            array.push(post);
          }
        }

      }
      return array;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn {
    margin-right: 5px;
  }


</style>
