<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SurveyResource\Pages;
use App\Filament\Resources\SurveyResource\RelationManagers;
use App\Models\Survey;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SurveyResource extends Resource
{
    protected static ?string $model = Survey::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship(name: 'user', titleAttribute: 'name'),
                Forms\Components\Select::make('company_id')
                    ->relationship(name: 'company', titleAttribute: 'name'),
                Forms\Components\Select::make('city_id')
                    ->relationship(name: 'city', titleAttribute: 'name'),
                Forms\Components\Select::make('role_id')
                    ->relationship(name: 'role', titleAttribute: 'name'),
                Forms\Components\Select::make('department_id')
                    ->relationship(name: 'department', titleAttribute: 'name'),
                Forms\Components\Toggle::make('is_anonymous'),
                Forms\Components\Toggle::make('is_employed'),
                Forms\Components\DateTimePicker::make('employed_from_date'),
                Forms\Components\DateTimePicker::make('employed_to_date'),
                Forms\Components\TextInput::make('overall_rating')
                    ->numeric(),
                Forms\Components\TextInput::make('last_answered')
                    ->numeric(),
                Forms\Components\TextInput::make('review')
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('company.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('city.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('role.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('department.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_anonymous')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_employed')
                    ->boolean(),
                Tables\Columns\TextColumn::make('employed_from_date')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('employed_to_date')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('overall_rating')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('last_answered')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('review')
                    ->searchable(),
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
            RelationManagers\SurveyQuestionsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSurveys::route('/'),
            'create' => Pages\CreateSurvey::route('/create'),
            'view' => Pages\ViewSurvey::route('/{record}'),
            'edit' => Pages\EditSurvey::route('/{record}/edit'),
        ];
    }
}
