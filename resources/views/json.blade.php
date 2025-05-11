@foreach($getState() as $category => $data)
    @if($data['original'] !== $data['modified'])
        <small>{{ ucfirst($category) }} changed from <del> {{ $data['original'] }} </del> to <strong> {{ $data['modified'] }}</strong>@if(!$loop->last),@endif&nbsp;</small>
    @endif
@endforeach