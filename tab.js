// Tab Plugin
(function($) {
    var self = this;

    _changeActiveElement = function(selectedElement, elements) {
	$(elements).removeClass('active');
	$(selectedElement).addClass('active');
    }

    _setupSelectMenu = function() {
	$(".cd-tab-headers").
	    append('<select class="cd-mobile-tab-headers"></select>');
	var select = self.$tab.find('select');

	var options = self.$tabHeaders.each(function() {
	    var option = document.createElement('option');
	    $(option).html($(this).html());
	    select.append(option);
	});
    }

    _onTabChanged = function(e) {
	if(this.tagName === "SELECT") {
	    self.selectedIndex = this.selectedIndex;
	}
	else {
	    self.selectedIndex = self.$tabHeaders.index(this);
	}
	self._setActiveIndex();
    }

    _setActiveIndex = function() {
	var selectedTabHeader = self.$tabHeaders[self.selectedIndex];
	var selectedTabContent = self.$tabContents[self.selectedIndex];

	self._changeActiveElement(selectedTabHeader, self.$tabHeaders);
	self._changeActiveElement(selectedTabContent, self.$tabContents);
	$tab.find('select')[0].selectedIndex = self.selectedIndex;
    }

    $.fn.cdTab = function(options) {
	self.selectedIndex = (options && options.default) ? options.default - 1 : 0;

	self.$tab = $(this);
	self.$tabHeaders = $tab.find(".cd-tab-headers > div");
	self.$tabContents = $tab.find(".cd-tab-content > div");
	self._setupSelectMenu();
	
	self._setActiveIndex();

	var tabHeadersCount = self.$tabHeaders.length;

	$tab.find(".cd-tab-headers > div").click(self._onTabChanged);
	$tab.find("select").change(self._onTabChanged);
    }
})(jQuery);

// Tab instance initialization
$(function() {
    // 'default' is used to set the selected tab indexed from 1
    $(".wikipedia-details-tab").cdTab({default: 2});
})
