export default {
  name: 'write',
  components: {},
  props: [],
  data () {
    return {
        board:{

        }
    }
  },
  computed: {

  },
   created: function () {
     let id = this.$route.params.id;
     if(id == null || id == ""){
      return;
     }
     this.$http.get(`/api/board/${id}`).then((response) => {
       this.boards = response.data;
       console.log(response.data);
     }).catch((err) => {
       alert('게시글을 가져올 수 없습니다.');
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
    },
    leadingZeros(n, digits) {
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    },
    boardSave(){
      var d = new Date();

      var s =
      this.leadingZeros(d.getFullYear(), 4) + '-' +
      this.leadingZeros(d.getMonth() + 1, 2) + '-' +
      this.leadingZeros(d.getDate(), 2) + ' ' +

      this.leadingZeros(d.getHours(), 2) + ':' +
      this.leadingZeros(d.getMinutes(), 2) + ':' +
      this.leadingZeros(d.getSeconds(), 2);
      this.board.register = this.$session.get('userInfo').id;
      this.board.registedAt = s;

      /* node roytes/board.js */
      this.$http.post('/api/board', this.board)
      .then((response) => {
        console.log(response);
        alert('글이 정상적으로 저장 되었습니다.');
        this.$router.push('/board/list')
      })
      .catch((err) => {
        alert(err);
      });
    }
  }
}
