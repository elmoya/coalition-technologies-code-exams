<!DOCTYPE html>
<html lang="en">

<style>
    .editable {
        cursor: pointer;
    }

    .editable:hover {
        background-color: lightgoldenrodyellow;
    }
</style>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="container mt-4">
    <h2>Product Form</h2>

    <form id="productForm">
        @csrf
        <div class="mb-3">
            <label>Product Name</label>
            <input type="text" name="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Quantity in Stock</label>
            <input type="number" name="quantity" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Price per Item</label>
            <input type="number" step="0.01" name="price" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <h2 class="mt-4">Product List</h2>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Datetime Submitted</th>
                <th>Total Value</th>
                {{-- <th>Actions</th> --}}
            </tr>
        </thead>
        <tbody id="productTable">
            @php $totalSum = 0; @endphp
            @foreach ($products as $index => $product)
                @php $totalSum += $product['total_value']; @endphp
                <tr data-id="{{ $index }}">
                    <td class="editable" title="Click to Edit" data-field="name">{{ $product['name'] }}</td>
                    <td class="editable" title="Click to Edit" data-field="quantity">{{ $product['quantity'] }}</td>
                    <td class="editable" title="Click to Edit" data-field="price">${{ $product['price'] }}</td>
                    <td>{{ $product['submitted_at'] }}</td>
                    <td class="total-value">${{ $product['total_value'] }}</td>
                    {{-- <td><button class="btn btn-warning btn-sm edit-btn">Edit</button></td> --}}
                </tr>
            @endforeach
            <tr class="fw-bold">
                <td colspan="4">Total</td>
                <td id="totalSum">${{ number_format($totalSum, 2) }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            // Enable inline editing
            $(document).on('click', '.editable', function() {
                let currentVal = $(this).text().trim();
                let field = $(this).data('field');

                if (!$(this).find('input').length) {
                    $(this).html(`<input type="text" class="form-control" value="${currentVal}">`);
                    $(this).find('input').focus();
                }
            });

            // Save on focus out
            $(document).on('blur', '.editable input', function() {
                let newValue = $(this).val().trim();
                let field = $(this).parent().data('field');
                let row = $(this).closest('tr');
                let id = row.data('id');

                // Update cell text
                $(this).parent().text(newValue);

                // Send AJAX request to update JSON/XML
                $.ajax({
                    url: "{{ route('update') }}",
                    type: "POST",
                    data: {
                        _token: "{{ csrf_token() }}",
                        id: id,
                        field: field,
                        value: newValue
                    },
                    success: function(response) {
                        updateTable(response.data);
                    }
                });
            });

            // Edit button (just triggers inline edit)
            $(document).on('click', '.edit-btn', function() {
                $(this).closest('tr').find('.editable:first').click();
            });

            // Update table after AJAX success
            function updateTable(data) {
                let tableContent = '';
                let totalSum = 0;
                data.forEach((product, index) => {
                    totalSum += parseFloat(product.total_value);
                    tableContent += `<tr data-id="${index}">
                        <td class="editable" data-field="name">${product.name}</td>
                        <td class="editable" data-field="quantity">${product.quantity}</td>
                        <td class="editable" data-field="price">$${product.price}</td>
                        <td>${product.submitted_at}</td>
                        <td class="total-value">$${product.total_value}</td>
                    </tr>`;
                    // <td><button class="btn btn-warning btn-sm edit-btn">Edit</button></td>
                });
            tableContent += `<tr class="fw-bold">
                <td colspan="4">Total</td>
                <td id="totalSum">$${totalSum.toFixed(2)}</td>
            </tr>`;
            $('#productTable').html(tableContent);
            }
        });
    </script>
</body>

</html>
