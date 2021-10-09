$(document).ready(function() {
  function clearForm() {
    $('#title').val('');
    $('#author').val('');
    $('#website').val('');
  }

  $(document).on('click', 'button.edit', function() {
    const book = JSON.parse($(this).attr("data-item"));
    $('#update-book').attr('disabled', false);
    $('#book-id').val(book._id);
    $('#title').val(book.title);
    $('#author').val(book.author);
    $('#website').val(book.website);
    $('#add-book').hide();
    $('#update-book').show();
  });

  $(document).on('click', 'button.remove', function() {
    const bookId = $(this).attr("data-id");
    $.ajax({
      method: 'delete',
      url: '/book/delete',
      data: JSON.stringify({
        id: bookId,
      }),
      contentType: "application/json",
      success: function(response) {
        $('#book-id').val('');
        $('#update-book').hide();
        $('#add-book').show();
        clearForm();
        getAllBooks();
        alert(response.msg);
      },
      error: function(error) {
        alert(error.msg);
      }
    });
  });

  function getAllBooks() {
    $('#update-book').hide();
    $('#add-book').attr('disabled', true);
    $.ajax({
      method: 'get',
      url: '/book/all',
      success: function(response) {
        if (response.result && response.result.length) {
          $('#book-table tbody').remove();
          let bookRows = '';
          response.result.forEach((item, index) => {
            bookRows += `<tbody>
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.title}</td>
                                <td>${item.author}</td>
                                <td>${item.website}</td>
                                <td>
                                    <span>
                                        <button class="btn btn-warning edit" data-item='${JSON.stringify(item)}'>Edit</button>
                                    </span>
                                    <span>
                                        <button class="btn btn-danger remove" data-id='${item._id}'>Delete</button>
                                    </span>
                                </td>
                            </tr>
                            </tbody>`
          });
          $('#book-table').append(bookRows);
        } else {
          $('#book-table tbody').remove();
          const msg = `<tbody><tr colspan="5"><td>Nothing found.</td></tr></tbody>`;
          $('#book-table').append(msg);
        }
      },
      error: function(error) {
        alert(error.msg);
      }
    });
  }
  getAllBooks();
  $('#reset').click(function() {
    clearForm();
  });
  $('button[id="title"],[id="author"],[id="website"]').blur(function() {
    const title = $('#title').val();
    const author = $('#author').val();
    const website = $('#website').val();
    const bookId = $('#book-id').val();
    const allExist = title !== '' && author !== '' && website !== '';
    if (bookId && allExist) {
      $('#update-book').attr('disabled', false);
    } else if (allExist) {
      $('#add-book').attr('disabled', false);
    } else {
      $('#update-book').attr('disabled', true);
      $('#add-book').attr('disabled', true);
    }
  });
  $('button[id="add-book"],[id="update-book"]').click(function() {
    const payload = {
      title: $('#title').val(),
      author: $('#author').val(),
      website: $('#website').val(),
    };
    const options = {};
    const bookId = $('#book-id').val();
    if (bookId !== '') {
      options.method = 'put';
      options.url = '/book/update';
      payload._id = bookId;
    } else {
      options.method = 'post';
      options.url = '/book/add';
    }
    $.ajax({
      method: options.method,
      url: options.url,
      data: JSON.stringify(payload),
      contentType: "application/json",
      success: function(response) {
        $('#book-id').val('');
        $('#update-book').hide();
        $('#add-book').show();
        clearForm();
        getAllBooks();
        alert(response.msg);
      },
      error: function(error) {
        alert(error.msg);
      },
    });
  });
});