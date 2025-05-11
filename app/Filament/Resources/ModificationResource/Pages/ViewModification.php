<?php

namespace App\Filament\Resources\ModificationResource\Pages;

use App\Filament\Resources\ModificationResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewModification extends ViewRecord
{
    protected static string $resource = ModificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
