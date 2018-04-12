// STEP1 **** START!!!! just image upload without other thing
import image from './../../../assets/logo.png'
// STEP1 **** END!!!! just image upload without other thing
export default {
  name: 'view',
  components: {},
  props: [],
  data () {
    return {
      board : {},
      // STEP1 **** START!!!! just image upload without other thing
      defaultImage: image,
      // STEP1 **** END!!!! just image upload without other thing
    }
  },
  computed: {
  },
  created: function () {
     let no = this.$route.params.no;
     if(no == null || no == ""){
      this.$router.push('/board/list');
      return;
     }
     this.$http.get(`/api/board/view/${no}`).then((response) => {
      // STEP1 **** START!!!! just image upload without other thing
      response.data.imageData = !response.data.imageData ? this.defaultImage : response.data.imageData
      // STEP1 **** END!!!! just image upload without other thing
       this.board = response.data;
       console.log(response.data);
     }).catch((err) => {
       alert('게시글을 가져올 수 없습니다.');
       this.$router.push('/board/list');
     });
   },
  beforeCreate: function () {
    if (!this.$session.exists()) {

      this.$router.push('/');
    }
  },
  mounted () {

  },
  methods: {
    goList(){
      this.$router.push('/board/list');
    },
    boardDelete(){
      let no = this.$route.params.no;
      if(no == null || no == ""){
        return;
       }
       this.$http.delete(`/api/board/${no}`).then((response) => {

          let result = response.data;

          if(result == "success"){
            alert('게시글을 삭제하였습니다.');
            this.$router.push('/board/list');
          }
        }).catch((err) => {
          alert('게시글을 가져올 수 없습니다.');
          this.$router.push('/board/list');
        });
    }
  }
}
