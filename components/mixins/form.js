const mixin = {
  props: {
    parent: {
      type: Object,
      default: null
    },
    parentDirect: {
      type: Object,
      default: null
    },
    refName: {
      type: String,
      default: null,
      validate: (v) => !!v
    }
  },
  methods: {
    create() {
      console.error('No create method implemented')
    },
    submit() {
      console.error('No submit method implemented')
    },
    reset() {
      console.error('No reset method implemented')
    },
    _onError({ response: { data, status } }) {
      if (status === 404) this.parentRef.error(new Error('404 Not Found'), 'Endpoint Not Found')
      else if (status === 401) this.parentRef.error(new Error('401 Unauthorized'), 'Unauthorized')
      else this.parentRef.error(data.err || data, `${data.type}: ${data.msg}`)
    }
  },
  data() {
    return {
      parentRef: null,
      rules: {
        required: (v) => !!v || 'This field is required',
        number: (v) => !isNaN(v) || 'Must be a number',
        quality: (v) => /^\d+\+?$/.test(v) || 'Not a valid quality'
      }
    }
  },
  mounted() {
    this.parentRef = this.parent ? this.parent.$refs[this.refName] : this.parentDirect
    this.parentRef.$on('submit', this.submit)
    this.parentRef.$on('reset', this.reset)
    this.parentRef.$on('create', this.create)
    this.reset(false)
  }
}

export default mixin
