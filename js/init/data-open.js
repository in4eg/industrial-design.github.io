$('[data-open]').click(function() {
  var parent;
  parent = $($(this).data('open')).find('[data-hidden]');
  if (parent.hasClass('hidden')) {
    $(this).addClass('active');
    $($(this).data('open')).addClass('opened');
    parent.removeClass('hidden');
  } else {
    parent.addClass('hidden');
    $($(this).data('open')).removeClass('opened');
    $(this).removeClass('active');
  }
});
