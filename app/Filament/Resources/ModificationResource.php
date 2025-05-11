<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ModificationResource\Pages;
use App\Filament\Resources\ModificationResource\RelationManagers;
use App\Models\Modification;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ModificationResource extends Resource
{
    protected static ?string $model = \Approval\Models\Modification::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('modifiable_type')
                    ->maxLength(255),
                Forms\Components\TextInput::make('modifiable_id')
                    ->maxLength(255),
                Forms\Components\TextInput::make('modifier_type')
                    ->maxLength(255),
                Forms\Components\TextInput::make('modifier_id')
                    ->maxLength(255),
                Forms\Components\Toggle::make('active'),
                Forms\Components\Toggle::make('is_update'),
                Forms\Components\TextInput::make('approvers_required')
                    ->numeric(),
                Forms\Components\TextInput::make('disapprovers_required')
                    ->numeric(),
                Forms\Components\KeyValue::make('modifications')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('modifiable_type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('modifiable_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('modifier_type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('modifier_id')
                    ->searchable(),
                Tables\Columns\IconColumn::make('active')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_update')
                    ->boolean(),
                Tables\Columns\TextColumn::make('approvers_required'),
                Tables\Columns\TextColumn::make('disapprovers_required'),
                Tables\Columns\ViewColumn::make('modifications')
                    ->view('json')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListModifications::route('/'),
            'create' => Pages\CreateModification::route('/create'),
            'view' => Pages\ViewModification::route('/{record}'),
            'edit' => Pages\EditModification::route('/{record}/edit'),
        ];
    }
}
