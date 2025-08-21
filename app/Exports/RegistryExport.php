<?php

namespace App\Exports;

use App\Models\Registry;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RegistryExport implements FromCollection, WithHeadings, WithMapping
{
    public function __construct(private int|null $id=null) {}
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Registry::query()
        ->when($this->id, fn ($query) => $query->where('id', $this->id))
        ->with(['author', 'smallBusinessEntity', 'supervisoryAuthority'])->get();
    }

    public function map($registry): array
    {
        return [
            $registry->id,
            $registry->author->name,
            $registry->smallBusinessEntity->name,
            $registry->supervisoryAuthority->name,
            $registry->start_verification,
            $registry->end_verification,
            $registry->duration,
        ];
    }

    public function headings(): array
    {
        return [
            'ID',
            'Author',
            'Small Business Entity',
            'Supervisory Authority',
            'Start Verification',
            'End Verification',
            'Duration',
        ];
    }
}
