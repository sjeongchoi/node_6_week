export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {
      user_id: null,
      user_pw: null,
    }
  },
  computed: {

  },
  mounted () {

  }
  ,
  methods: {
    userInfoCheck () {
      this.$http.post(`/api/user/login`, {
        user_id : this.user_id
        , user_pw : this.user_pw
      })
        .then((response) => {
          this.$session.start()
          this.$session.set('userInfo', response.data);
          this.$router.push('/board/list')

        })
        .catch((err) => {
          console.log(err);
          alert('아이디 또는 패스워드가 틀렸습니다.');
        });
    }
  },
}
