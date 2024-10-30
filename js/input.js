(function($) {
    acf.fields.link = acf.field.extend({
        type: 'link',
        $el:  null,

        actions: {
            'ready':  'init',
            'append': 'init',
        },

        events: {
            'click a[data-name="add"]':    'add',
            'click a[data-name="edit"]':   'edit',
            'click a[data-name="remove"]': 'remove'
        },

        config: {
            selectors: {
                // Modal
                linkSubmit:    '#wp-link-submit',
                linkTitle:     '#wp-link-text',
                linkUrl:       '#wp-link-url',
                linkTarget:    '#wp-link-target',

                // Hidden fields
                title:         '[data-name="title"]',
                url:           '[data-name="url"]',
                target:        '[data-name="target"]',

                // Display elements
                displayTitle:  '[data-name="display-title"]',
                displayUrl:    '[data-name="display-url"]',
                displayTarget: '[data-name="display-target"]'
            }
        },

        dom: {},

        focus: function() {
            this.$el = this.$field.find('.acf-link')
            this.o   = acf.get_data(this.$el)

            // Modal
            this.dom.linkSubmit = $(this.config.selectors.linkSubmit)
            this.dom.linkTitle  = $(this.config.selectors.linkTitle)
            this.dom.linkUrl    = $(this.config.selectors.linkUrl)
            this.dom.linkTarget = $(this.config.selectors.linkTarget)

            // Hidden fields
            this.dom.title  = this.$el.find(this.config.selectors.title)
            this.dom.url    = this.$el.find(this.config.selectors.url)
            this.dom.target = this.$el.find(this.config.selectors.target)

            // Display elements
            this.dom.displayTitle  = this.$el.find(this.config.selectors.displayTitle)
            this.dom.displayUrl    = this.$el.find(this.config.selectors.displayUrl)
            this.dom.displayTarget = this.$el.find(this.config.selectors.displayTarget)
        },

        init: function() {
            this.dom.linkSubmit.on('click', this.submit.bind(this))
        },

        add: function() {
            wpLink.open()

            this.dom.linkTarget.prop('checked', false)
        },

        edit: function() {
            wpLink.open()

            this.dom.linkTitle.val(this.dom.title.val())
            this.dom.linkUrl.val(this.dom.url.val())
            this.dom.linkTarget.prop('checked', !!parseInt(this.dom.target.val()))
        },

        remove: function() {
            this.render({
                title:  null,
                url:    null,
                target: false
            })

            this.$el.removeClass('has-value')
        },

        submit: function(e) {
            var title, attrs, link

            title = this.dom.linkTitle.val()
            attrs = wpLink.getAttrs()

            link = {
                title:  title,
                url:    attrs.href,
                target: !!attrs.target
            }

            this.render(link)
        },

        render: function(link) {
            this.dom.title.val(link.title)
            this.dom.url.val(link.url)
            this.dom.target.val(link.target ? 1 : 0).change()

            this.dom.displayTitle.text(link.title)
            this.dom.displayUrl.attr('href', link.url).text(link.url)
            this.dom.displayTarget.text(acf._e('link', link.target ? 'newTab' : 'sameTab'))

            this.$el.addClass('has-value')
        }
    })
})(jQuery)
