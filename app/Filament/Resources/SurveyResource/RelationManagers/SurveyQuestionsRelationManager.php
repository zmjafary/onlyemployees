<?php

namespace App\Filament\Resources\SurveyResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SurveyQuestionsRelationManager extends RelationManager
{
    protected static string $relationship = 'surveyQuestions';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('survey_id')
                    ->relationship(name: 'survey', titleAttribute: 'id'),
                Forms\Components\Select::make('question_id')
                    ->relationship(name: 'question', titleAttribute: 'question_regular'),
                Forms\Components\Textarea::make('answer')
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_yes'),
                Forms\Components\TextInput::make('rating')
                    ->numeric(),
                Forms\Components\TextInput::make('comment')
                    ->maxLength(255),
                Forms\Components\Repeater::make('additionalResponses')
                    ->relationship('additionalResponses')
                    ->schema([
                        Forms\Components\TextInput::make('response')
                        ->maxLength(255),
                    ])
                    ->grid(2)
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
                Tables\Columns\TextColumn::make('survey.id')
                    ->sortable(),
                Tables\Columns\TextColumn::make('question.question_regular')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_yes')
                    ->boolean(),
                Tables\Columns\TextColumn::make('rating')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('comment')
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
