<template>
  <div>
  <div class="konkurs-h">
    <h1 class="konkurs-h1">Расскажите о&nbsp;приобретении своей кухни.</h1>
    <div class="konkurs-h2">Чем подробнее и&nbsp;детальнее будет история, тем больше шансов стать победителем!</div>
  </div>
  <form class="form" @submit="formHandle('form', $event)">
    <div class="form-h1">О себе</div>
    <div class="form-row">
      <div class="form-field">
        <label for="name">Ваше имя<span class="required" v-show="fields.name && !fields.name.valid">*</span></label>
        <input type="text" v-model="form.name" id="name" name="name" @change="formHandle('name', $event)" v-validate="'required|alpha_spaces|min:2'" data-vv-delay="1000">
      </div><div class="form-field">
        <label for="name">Ваш телефон<span class="required" v-show="fields.phone && !fields.phone.valid">*</span></label>
        <input id="phone" type="text" name="phone" v-model="form.phone" @change="formHandle('phone', $event)" placeholder="+7 (999) 999-99-99" v-mask="'+# (###) ###-##-##'" v-validate="'required|min:18'" data-vv-delay="1000">
      </div><div class="form-field">
        <label for="name">Ваш email<span class="required" v-show="fields.email && !fields.email.valid">*</span></label>
        <input type="email" v-model="form.email" id="email" @change="formHandle('email', $event)" name="email" v-validate="'required|email'" data-vv-delay="1000">
      </div><div class="form-field">
        <label for="order">Ваш номер договора/заказа<span class="required" v-show="fields.order && !fields.order.valid">*</span></label>
        <input type="text" v-model="form.order" id="order" name="order" @change="formHandle('order', $event)" v-validate="'required|min:7'" data-vv-delay="1000">
      </div><div class="form-field">
        <label for="city">Ваш город<span class="required" v-show="fields.city && !fields.city.valid">*</span></label>
        <select type="text" v-model="form.city" id="city" name="city" @change="formHandle('city', $event)" v-validate="'required'" data-vv-delay="1000">
          <option v-for="(item) in cities.cities" :key="item.mr3id" :mr3id="item.mr3id" :value="item.name">{{ item.name }}</option>
        </select>
      </div><div class="form-field">
        <label for="name">Ваша студия<span class="required" v-show="fields.shop && !fields.shop.valid">*</span></label>
        <select type="text" v-model="form.shop" id="shop" name="shop" @change="formHandle('shop', $event)" v-validate="'required'" data-vv-delay="1000">
          <option v-for="(item) in shops[form.city]" :key="item.mr3id" :mr3id="item.mr3id" :value="item.name">{{ item.address }}</option>
        </select>
      </div>
    </div>

    <div class="form-d1"></div>

    <div class="form-h1">О кухне</div>
    <div class="form-row">
      <div class="form-field form-field1">
        <label for="kitchen">Какую модель Вы выбрали и почему?<span class="required" v-show="fields.kitchen && !fields.kitchen.valid">*</span></label>
        <textarea type="text" v-model="form.kitchen" id="kitchen" name="kitchen" @change="formHandle('kitchen', $event)" :rows="kitchenrows" v-validate="'required|min:2'" data-vv-delay="1000"></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-field form-field1">
        <label for="color">С чем связан выбор цвета?<span class="required" v-show="fields.color && !fields.color.valid">*</span></label>
        <textarea type="text" v-model="form.color" id="color" name="color" @change="formHandle('color', $event)" :rows="colorrows" v-validate="'required|min:2'" data-vv-delay="1000"></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-field form-field1">
        <label for="why">Главная задача и особенность проекта.<span class="required" v-show="fields.why && !fields.why.valid">*</span></label>
        <textarea type="text" v-model="form.why" id="why" name="why" @change="formHandle('why', $event)" :rows="whyrows" v-validate="'required|min:2'" data-vv-delay="1000"></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-field form-field1">
        <label for="whose">Для кого эта кухня?<span class="required" v-show="fields.whose && !fields.whose.valid">*</span></label>
        <textarea type="text" v-model="form.whose" id="whose" name="whose" @change="formHandle('whose', $event)" :rows="whoserows" v-validate="'required|min:2'" data-vv-delay="1000"></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-field form-field1">
        <label for="info">Дополнительная информация</label>
        <textarea type="text" v-model="form.info" id="info" name="info" @change="formHandle('info', $event)" :rows="inforows"></textarea>
      </div>
    </div>

    <div class="form-d1"></div>

    <div class="form-h1">Фото</div>
    <label>Основное фото<span class="required" v-show="fields.upload0 && !fields.upload0.valid">*</span></label>
    <div class="form-row" id="upload0">
      <div class="form-field demo-upload-list" v-for="(item, i) in form.uploadList[0]" :key="'item'+i" :style="photostyle" :class="item.name">
        <template v-if="item.status === 'finished'">
          <div class="demo-upload-list-img" :style="'background-image:url(' + item.thumb + ')'"></div>
          <div class="demo-upload-list-cover" @click="handleRemove(item, 0)"></div>
        </template>
        <template v-else>
          <Progres v-if="item.showProgress" :procent="item.percentage" />
        </template>
      </div><Upload
      ref="upload0"
      class="form-field"
      :style="photostyle"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="uploadext"
      :on-format-error="handleFormatError"
      multiple
      type="drag"
      :data="{userid:form.userid}"
      :action="uploadurl">
      <div class="upload"></div>
    </Upload>
    </div>

    <label>Дополнительные фото<span class="required" v-show="fields.upload1 && !fields.upload1.valid">*</span></label>
    <div class="form-row" id="upload1">
      <div class="form-field demo-upload-list" v-for="(item, i) in form.uploadList[1]" :key="'item'+i" :style="photostyle" :class="item.name">
        <template v-if="item.status === 'finished'">
          <div class="demo-upload-list-img" :style="'background-image:url(' + item.thumb + ')'"></div>
          <div class="demo-upload-list-cover" @click="handleRemove(item, 1)"></div>
        </template>
        <template v-else>
          <Progres v-if="item.showProgress" :procent="item.percentage" />
        </template>
      </div><Upload
        ref="upload1"
        class="form-field"
        :style="photostyle"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="uploadext"
        :on-format-error="handleFormatError"
        multiple
        type="drag"
        :data="{userid:form.userid}"
        :action="uploadurl">
        <div class="upload"></div>
      </Upload>
    </div>

    <div class="form-d1"></div>

    <div class="form-row">
      <div class="form-field form-field-label">
        <label for="agree"><input type="checkbox" id="agree" v-model="form.agree" name="agree" @change="formHandle('agree', $event)" v-validate="'required'" data-vv-delay="1000">
        Согласен с обработкой персональных данных<span class="required" v-show="fields.agree && !fields.agree.valid">*</span></label>
      </div>
    </div>

    <div class="form-row">
      <div class="form-field">
        <button type="submit" id="button" @click="formHandle('button', $event)" :class="form.status">Отправить</button>
      </div>
    </div>

  </form>

  <div class="konkurs-text konkurs-container">
    <b>Требования к&nbsp;фото:</b>
    <ul>
      <li>
        Съемка при дневном освещении (обязательна фотосъемка без вспышки, чтобы отсутствовали блики).
      </li>
      <li>
        Чем меньше предметов на&nbsp;столешнице, тем лучше. Можете оставить несколько ярких аксессуаров для акцента.
      </li>
      <li>
        На&nbsp;фотографиях не&nbsp;должно быть следов ремонта (торчащие провода, отсутствие штукатурки, строительный
        мусор и&nbsp;т.&nbsp;д.).
      </li>
      <li>
        Фотографии должны быть выполнены в&nbsp;высоком разрешении не&nbsp;менее 3000&times;2000, допустимые форматы: jpg, png, tiff.
      </li>
    </ul>
    <p>
      <b>Количество фотографий:</b>
      <br>
      Должно быть не&nbsp;менее двух снимков общего плана кухни с&nbsp;разных ракурсов, не&nbsp;менее двух фотографий основных
      акцентов кухонного гарнитура в&nbsp;зависимости от&nbsp;дизайн-проекта.
    </p>
    <p>
      <a href="/konkurs/terms/">Полные правила конкурса</a>
    </p>
  </div>

  <div class="konkurs-message" v-html="message" :class="message ? 'show' : ''"></div>
  </div>
</template>

<script>
import Progres from '@/components/Progres'
import { Upload } from 'iview'
const url = 'https://mia-kuhni.ru/konkurs/uploads/'
const ajaxurl = 'https://mia-kuhni.ru/konkurs/ajax.php'
const uploadurl = 'https://mia-kuhni.ru/konkurs/upload.php'
export default {
  name: 'Form',
  inject: ['$validator'],
  data () {
    return {
      form: {
        userid: false,
        name: '',
        phone: '7',
        email: '',
        order: '',
        city: '',
        shop: '',
        kitchen: '',
        color: '',
        why: '',
        whose: '',
        info: '',
        uploadList: [],
        agree: true,
        status: ''
      },
      uploadurl: uploadurl,
      photowidth: 100,
      uploadext: ['jpg', 'jpeg', 'png', 'tif', 'tiff'],
      cities: false,
      shops: [],
      message: ''
    }
  },
  computed: {
    kitchenrows: function () {
      return this.lines(this.form.kitchen)
    },
    colorrows: function () {
      return this.lines(this.form.color)
    },
    whyrows: function () {
      return this.lines(this.form.why)
    },
    whoserows: function () {
      return this.lines(this.form.whose)
    },
    inforows: function () {
      return this.lines(this.form.info)
    },
    photostyle: function () {
      return 'height:' + this.photowidth + 'px;line-height:' + this.photowidth + 'px;'
    }
  },
  methods: {
    windowResized () {
      this.photowidth = document.getElementById('email').offsetWidth
    },
    showmessage (message) {
      let that = this
      this.message = message
      setTimeout(function () {
        that.message = ''
      }, 3000)
    },
    lines (field) {
      return 1 + (field.match(/\n/g) || []).length
    },
    countStars () {
      let stars = 0
      for (let field in this.fields) {
        if (!this.fields[field].valid) {
          stars = field
        }
      }
      return stars
    },
    formHandle (field, event) {
      event.preventDefault()
      this.$ls.set('form', JSON.stringify(this.form))
      if (field === 'city') {
        this.form.shop = this.shops[this.form.city][0].name
        this.$ls.set('form', JSON.stringify(this.form))
      } else if (field === 'button') {
        let stars = this.countStars()
        if (stars) {
          this.showmessage('<b>Заполните все обязательные поля, отмеченные звёздочкой *</b>')
          this.$scrollTo('#' + stars, 500, {offset: -100})
        } else {
          this.form.status = 'sending'
          this.$http.post(ajaxurl, {data: JSON.stringify(this.form)}).then(response => {
            if (response.ok) {
              let that = this
              setTimeout(function () {
                that.$ls.remove('form')
                that.$router.push('/thankyou')
              }, 500)
            }
          }, response => {
            this.form.status = ''
            this.showmessage('<b>Не получается сохранить.</b><br>Попробуйте отправить ещё раз.')
          })
        }
      }
    },
    handleRemove (file, uploadid) {
      let fileList = this.$refs['upload' + uploadid].fileList
      file.name = 'remove'
      let that = this
      setTimeout(function () {
        fileList.splice(fileList.indexOf(file), 1)
        that.$ls.set('form', JSON.stringify(that.form))
        that.fields['upload' + uploadid] = {
          valid: fileList.length
        }
      }, 500)
    },
    handleSuccess (res, file, fileList) {
      if (res.errors) {
        if (res.errors === 'size') {
          this.handleRemove(file, this.form.uploadList.indexOf(fileList))
          this.showmessage('<b>Недопусимый размер фото.</b><br>См. «Требования к фото» ниже.')
        }
      } else {
        file.name = res.url
        file.url = url + res.url
        file.thumb = url + res.tumb
        this.fields['upload' + this.form.uploadList.indexOf(fileList)] = {
          valid: true
        }
        this.$ls.set('form', JSON.stringify(this.form))
      }
    },
    handleFormatError (file, fileList) {
      this.showmessage('<b>Недопусимый формат фото.</b><br>См. «Требования к фото» ниже.')
      if (fileList) {
        let index = fileList.length - 1
        if (!fileList[index] || (fileList[index].name !== 'error')) {
          fileList.push({name: 'error'})
          setTimeout(function () {
            fileList.splice(index + 1, 1)
          }, 3000)
        }
      }
    },
    getshops () {
      this.$http.get('https://module.infcentre.ru/um/um/umdata/49941A18-91E0-7F1F-8234-11B1F55CE2EF').then(response => {
        this.cities = response.body
        let that = this
        this.cities.shops.map(function (item) {
          if (!that.shops[item.city]) {
            that.shops[item.city] = []
          }
          that.shops[item.city].push(item)
        })
      }, response => {
        this.showmessage('<b>Не получается загрузить список студий.</b><br>Попробуйте обновить страницу.')
      })
    },
    initform () {
      let form = JSON.parse(this.$ls.get('form'))
      if (form) {
        this.form = form
        this.form.status = ''
      }
      if (!this.form.userid) {
        this.$http.get(uploadurl).then(response => {
          this.form.userid = response.body
          this.$ls.set('form', JSON.stringify(this.form))
        })
      }
    }
  },
  created: function () {
    this.getshops()
    this.initform()
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.windowResized)
      this.windowResized()
      for (let i = 0; i < 2; i++) {
        if (typeof this.form.uploadList[i] === 'object') {
          this.$refs['upload' + i].fileList = this.form.uploadList[i]
        } else {
          this.form.uploadList[i] = this.$refs['upload' + i].fileList
        }
        this.fields['upload' + i] = {
          valid: this.form.uploadList[i].length
        }
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResized)
  },
  components: {Progres, Upload}
}
</script>

<style scoped>
  input, textarea, select, button {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: .95em;
    width: 100%;
    padding: .5em 1em;
    line-height: 1.5em;
    box-sizing: border-box;
  }
  input, textarea, select {
    border: 1px solid #ccc;
  }
  option:checked {
    background: #c71b3d !important;
    color: #fff !important;
  }
  input:focus, textarea:focus, button:focus {
    animation: form .3s ease;
  }

  .form-h1 {
    color: #999;
    font-size: 1.2em;
    margin:0 0 1em;
  }
  @media (min-width: 1220px) {
    .form-h1 {
      position: absolute;
      margin:0 0 0 -6em;
      line-height: .5em;
    }
  }
  .form-row {
    margin-left:-3%;
  }
  .form-field {
    display: inline-block;
    width: 30%;
    margin: 0 0 1.6em 3%;
    vertical-align:top;
  }
  @media (max-width: 700px) {
    .form-field {
      width: 46.5%;
      margin-bottom: 1em;
    }
  }
  @media (max-width: 400px) {
    .form-field {
      width: 100%;
    }
  }
  .form-field1, .form-field-label {
    display: block;
    width: 96%;
  }
  label {
    font-size: .9em;
    font-weight: 700;
    color: #555c60;
    display: block;
    margin-bottom: .3em;
  }
  label .required {
    color: #c71b3d;
  }
  .form-d1 {
    margin-bottom:3em;
  }
  textarea {
    resize: vertical;
    max-height: 300px;
    min-height: 2.5em;
    transition: all .5s ease;
  }
  textarea:focus {
    min-height: 4em;
  }

  .form-field-label input {
    width: auto;
  }
  .form-field-label label {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: .66em;
    font-weight: 400;
    color: #555c60;
    display: inline-block;
    margin-bottom: .3em;
  }

  button {
    font-family: 'Schlange';
    background: #c6203e;
    border: 0;
    color: #fff;
    font-weight: 900;
    font-size: 1.4em;
    padding: .4em 0;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
    transition: all .3s ease;
  }
  button:hover {
    background: #f1284c;
  }
  button.sending {
    background: #ddd;
    overflow: hidden;
    position: relative;
    color: #ddd;
    cursor: pointer;
  }
  button.sending:before {
    content: '';
    position: absolute;
    background: 50% 50% no-repeat;
    left: 0;
    width: 100%;
    height: 1.5em;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94' stroke-linecap='round' stroke='%23ffffff' stroke-width='8' fill='none' style='stroke-dasharray: 300px, 300px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease; stroke-dashoffset:100px;'%3E%3C/path%3E%3C/svg%3E");
    animation: sending 1s infinite linear;
  }
  @keyframes sending {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .konkurs-message {
    position: fixed;
    font-size: 1.2em;
    line-height: 1.2em;
    box-sizing: border-box;
    top:2em;
    left:50%;
    transform: translate(-50%, -100vh);
    background: #c6203e;
    color: #fff;
    box-shadow: 0 0 50px rgba(0,0,0,.5);
    padding:1em;
    text-align: center;
    width: 40vw;
    min-width: 300px;
    z-index: 100;
    transition: all .5s ease;
  }
  @media (max-width: 1000px) {
    .konkurs-message {
      font-size: 1em;
      top:0;
      padding:1em;
      min-width: 100%;
    }
  }
  .konkurs-message.show {
    transform: translate(-50%, 0);
  }
</style>
