<?php

namespace App\Filament\Resources\TopicResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QuestionsRelationManager extends RelationManager
{
    protected static string $relationship = 'questions';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('question_regular')
                    ->maxLength(255),
                Forms\Components\TextInput::make('question_meme')
                    ->maxLength(255),
                Forms\Components\TextInput::make('favour_gif')
                    ->maxLength(255),
                Forms\Components\TextInput::make('against_gif')
                    ->maxLength(255),
                Forms\Components\Toggle::make('is_active'),
                Forms\Components\Select::make('topic_id')
                    ->relationship(name: 'topic', titleAttribute: 'name'),
                Forms\Components\Toggle::make('needs_additional_responses')
            ]);
    }

    public function isReadOnly(): bool
    {
        return false;
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('question_regular')
                    ->searchable(),
                Tables\Columns\TextColumn::make('question_meme')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('favour_gif'),
                Tables\Columns\ImageColumn::make('against_gif'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('topic.name')
                    ->sortable(),
                Tables\Columns\IconColumn::make('needs_additional_responses')
                    ->boolean(),
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
            ->headerActions([
                Tables\Actions\CreateAction::make(),
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
}
