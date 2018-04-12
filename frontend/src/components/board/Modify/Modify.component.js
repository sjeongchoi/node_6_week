export default {
  name: 'modify',
  components: {},
  props: [],
  data () {
    return {
        board:{

        },
        //  STEP1 **** START!!! just image upload without other thing ---------
        selectedImage: '',
        imageInfo: {},
        //  STEP1 **** END!!! just image upload without other thing ---------
    }
  },
  computed: {

  },
   created: function () {
    /* 변경된 부분  this.$route.params.id => this.$route.params.id */
     let no = this.$route.params.no;
     if(no == null || no == ""){
      return;
     }
     this.$http.get(`/api/board/view/${no}`).then((response) => {
        this.board = response.data;
        this.selectedImage = response.data.imageData
        this.imageInfo.imageName = response.data.imageName
        this.imageInfo.imageSize = response.data.imageSize
        this.imageInfo.imageFormat = response.data.imageFormat
     }).catch((err) => {
       alert('게시글을 가져올 수 없습니다.');
       this.$router.push('/board/list');
     });
   },

  beforeCreate: function () {
    if (!this.$session.exists()) {

      this.$router.push('/member/login');
    }
  },
  mounted () {

  },
  methods: {
    goList(){
      this.$router.push('/board/list');
    },
    boardAdjust(){
      //  STEP1 **** START!!! just image upload without other thing ---------
      this.board.imageData = this.selectedImage
      this.board.imageInfo = this.imageInfo
      //  STEP1 **** END!!! just image upload without other thing ---------
      this.$http.put('/api/board', this.board)
      .then((response) => {
        alert('글이 정상적으로 저장 되었습니다.');
        this.$router.push('/board/list')
      })
      .catch((err) => {
        alert(err);
      });
    },
    //  STEP1 **** START!!! just image upload without other thing ---------
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files;
      if(!files) return;
      let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.selectedImage = e.target.result;
      }
      reader.readAsDataURL(files[0])
      this.imageInfo.imageName = files[0].name
      this.imageInfo.imageSize = files[0].size
      this.imageInfo.imageFormat = files[0].type
    },
    //  STEP1 **** END!!! just image upload without other thing ---------
  }
}
