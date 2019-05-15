<template>
  <div
    style="padding:20px;height: calc(100vh - 51px);overflow: auto;-webkit-overflow-scrolling: touch;"
  >
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div style="display:flex">
          <div class="field" style="flex:7">
            <label class="label">Page Title</label>
            <input
              v-model="pageTitle"
              class="input outline-primary"
              type="text"
              placeholder="Diary Page Title"
              required
            >
          </div>
          <div class="field" style="flex:4;margin-left:10px;">
            <label class="label">Assign Date</label>
            <p class="control has-icons-left">
              <flat-pickr
                v-model="date"
                :config="config"
                placeholder="Select a date"
                name="birthdate"
              ></flat-pickr>
              <span class="icon is-small is-left">
                <i class="fas fa-calendar"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="editor">
          <editor-menu-bar :editor="editor">
            <div class="menubar" slot-scope="{ commands, isActive }">
              <button
                class="button"
                :class="{ 'is-light': isActive.bold() }"
                @click="commands.bold"
              >
                <span class="icon">
                  <i class="fas fa-bold"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.italic() }"
                @click="commands.italic"
              >
                <span class="icon">
                  <i class="fas fa-italic"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.strike() }"
                @click="commands.strike"
              >
                <span class="icon">
                  <i class="fas fa-strikethrough"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.underline() }"
                @click="commands.underline"
              >
                <span class="icon">
                  <i class="fas fa-underline"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.paragraph() }"
                @click="commands.paragraph"
              >
                <span class="icon">
                  <i class="fas fa-paragraph"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >H1</button>

              <button
                class="button"
                :class="{ 'is-light': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
              >H2</button>

              <button
                class="button"
                :class="{ 'is-light': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
              >H3</button>

              <button
                class="button"
                :class="{ 'is-light': isActive.bullet_list() }"
                @click="commands.bullet_list"
              >
                <span class="icon">
                  <i class="fas fa-list-ul"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.ordered_list() }"
                @click="commands.ordered_list"
              >
                <span class="icon">
                  <i class="fas fa-list-ol"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.blockquote() }"
                @click="commands.blockquote"
              >
                <span class="icon">
                  <i class="fas fa-quote-right"></i>
                </span>
              </button>

              <button
                class="button"
                :class="{ 'is-light': isActive.code_block() }"
                @click="commands.code_block"
              >
                <span class="icon">
                  <i class="fas fa-code"></i>
                </span>
              </button>

              <button class="button" @click="commands.horizontal_rule">
                <span class="icon">
                  <i class="fas fa-ruler-horizontal"></i>
                </span>
              </button>

              <button class="button" @click="commands.undo">
                <span class="icon">
                  <i class="fas fa-undo"></i>
                </span>
              </button>

              <button class="button" @click="commands.redo">
                <span class="icon">
                  <i class="fas fa-redo"></i>
                </span>
              </button>
            </div>
          </editor-menu-bar>

          <editor-content class="editor__content" :editor="editor"/>
          <div class="field has-text-centered custom_form_submit">
            <button
              @click="savePage"
              type="submit"
              class="button is-info ma-1"
              :class="{'is-loading': loading}"
            >Save</button>
            <button
              @click="$router.go(-1)"
              type="submit"
              class="button is-light ma-1"
              :class="{'is-loading': loading}"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  name: "page",
  props: ["id"],
  components: {
    EditorContent,
    EditorMenuBar
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
    activePages() {
      return this.$store.getters.activePages;
    },

    pageData() {
      if (this.$route.name == "page") {
        var data = this.activePages.filter(page => {
          return page.id == this.id;
        });

        return data[0];
      }
    }
  },
  data() {
    return {
      date: null,
      config: {
        altInput: true,
        dateFormat: "d M Y",
        altFormat: "d M Y",
        disableMobile: "true",
        maxDate: new Date()
      },
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: ``,
        onUpdate: ({ getHTML }) => {
          this.updateFlag = true;
          this.dataHtml = getHTML();
        }
      }),
      dataHtml: "",
      pageTitle: ""
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    formatDate(date) {
      var d = new Date(date),
        day = "" + d.getDate(),
        year = d.getFullYear();

      var monthShortNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      var month = monthShortNames[d.getMonth()];

      if (day.length < 2) day = "0" + day;
      return [day, month, year].join(" ");
    },

    setContent() {
      if (this.$route.name == "page") {
        console.log(1111);

        this.editor.setContent(this.pageData.data);
        this.pageTitle = this.pageData.title;
        this.dataHtml = this.pageData.data;
        this.date = this.pageData.date;
      } else {
        this.date = this.formatDate(+new Date());
      }
    },

    addNewPage() {
      let newPageToAdd = {
        data: this.dataHtml,
        title: this.pageTitle,
        date: this.date,
        diaryId: this.id,
        time: +new Date(),
        userId: this.user.uid
      };

      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
        .add(newPageToAdd)
        .then(docRef => {
          let newDiaryPage = newPageToAdd;
          newDiaryPage.id = docRef.id;

          let newPages = [...this.activePages];
          newPages.push(newDiaryPage);
          this.$store.dispatch("setActivePages", newPages);

          this.$store.dispatch("setLoading", false);
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    },

    saveExistingPage() {
      let editedData = {
        data: this.dataHtml,
        title: this.pageTitle,
        date: this.date,
        diaryId: this.pageData.diaryId,
        time: +new Date(), //needs change as well, maybe add timeModified at
        userId: this.user.uid
      };
      this.$store.dispatch("setLoading", true);
      firebase
        .firestore()
        .collection("pages")
        .doc(this.id)
        .update(editedData)
        .then(() => {
          let newPages = [...this.activePages];

          newPages.forEach(d => {
            if (d.id == this.id) {
              d.data = editedData.data;
              d.title = editedData.title;
              d.date = editedData.date;
              d.diaryId = editedData.diaryId;
              d.time = editedData.time;
              d.userId = editedData.userId;
            }
          });
          this.$store.dispatch("setActivePages", newPages);
          this.$store.dispatch("setLoading", false);
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setLoading", false);
        });
    },

    savePage() {
      if (this.$route.name == "page") {
        this.saveExistingPage();
      } else {
        this.addNewPage();
      }
    }
  },

  mounted() {
    this.setContent();
  }
};
</script>

<style lang="scss">
/* @import "../assets/css/tiptap.css"; */
.editor__content {
  margin-top: 10px;
  border: 2px solid #ececec;
}

ol {
  margin-left: 20px;
}

ul {
  margin-left: 20px;
  list-style: circle;
}
blockquote {
  padding-left: 30px;
  border-left: 3px solid #ccc;
  font-style: italic;
}
.ProseMirror {
  padding: 20px;
  border-radius: 3px;
}
.ProseMirror-focused {
  border-radius: 3px;
  outline: 1px solid #2e85be;
}

h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.1rem;
}

.custom_form_submit {
  margin-bottom: 60px;
  @media (max-width: 425px) {
    margin-bottom: 150px;
  }
}
</style>
