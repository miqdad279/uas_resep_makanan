<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResepCollection;
use App\Models\resep;
use App\Models\Resep as ModelsResep;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResepController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resep = new ResepCollection(Resep::OrderByDesc('id')->paginate(9));
        return Inertia::render('Homepage', [
            'title' => 'Resep Makanan',
            'description' => "Temukan dan Sajikan Resep Makanan Terbaik \nuntuk Keluarga Anda di Sini",
            'resep' => $resep,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $resep = new Resep();
        $resep->title = $request->title;
        $resep->description = $request->description;
        $resep->category = $request->category;
        $resep->author = auth()->user()->name;
        $resep->save();
        return redirect()->back()->with('message', 'Resep berhasil dibuat');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\resep  $resep
     * @return \Illuminate\Http\Response
     */
    public function show(resep $resep)
    {
        $myResep = $resep::where('author', auth()->user()->name)->get();
        return Inertia::render('Dashboard', [
            'myResep' => $myResep,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\resep  $resep
     * @return \Illuminate\Http\Response
     */
    public function edit(resep $resep, Request $request)
    {
        return Inertia::render('EditResep', [
            'myResep' => $resep->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\resep  $resep
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $dataToUpdate = [
            'updated_at' => now(), // Update kolom 'updated_at' menjadi waktu saat ini
        ];
        if (!empty($request->title)) {
            $dataToUpdate['title'] = $request->title;
        }
        if (!empty($request->description)) {
            $dataToUpdate['description'] = $request->description;
        }
        if (!empty($request->category)) {
            $dataToUpdate['category'] = $request->category;
        }
        Resep::where('id', $request->id)->update($dataToUpdate);

        return redirect()->route('dashboard')->with('success', 'Resep berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\resep  $resep
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $resep = Resep::find($request->id);
        $resep->delete();
        return redirect()->back()->with('message', 'Resep berhasil dihapus');
    }

    public function showDetail($id)
    {
        $resep = Resep::findOrFail($id);

        return Inertia::render('ResepDetail', [
            'resep' => $resep,
        ]);
    }
}
