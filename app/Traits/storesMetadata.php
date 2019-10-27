<?php
namespace App\Traits;


trait storesMetadata {

    /**
     * Intercept  $model->update() so we can transform the data
     */
    public function update(array $data = array(), array $options = array() )
    {      
        $data = $this->transform($data);

        parent::update($data); 
    }


    /**
     * Intercept  Model::create() so we can transform the data
     */
    public static function create($data) {
        $model = (new static); // required to be able to call model non-static methods

        $model->setAttributes($data);

        $data = $model->transform($data);

        return $model::query()->create($data);
        
    }


    /**
     * Set the model attributes
     * Need to do this otherwise model
     * relationships cant be found
     */
    public function setAttributes($data)
    {
        foreach($this->fillable as $key){
            if(isSet($data[$key])){
                $this->$key = $data[$key];
            }
            
        }
    }

    /**
     *   Transform the input data to data plus metadata.
     *   If the data does not contain a key == the metaFieldname (eg meta ) 
     *   then transform extracts metadata out of top level input data fields 
     *   into the metadata. note it also deletes the top level input data key
     */
    public function transform($data)
    {
        /**
         * The name of the database field that stores the metadata.
         * Defaults to 'meta'
         */
        $metaFieldName = $this->metaFieldName(); 


        /**
         *  If input data already contains the metakey then just use that
         */
        if(isSet($data[$metaFieldName])){
            return $data; // nothing to do if metafield is set in data
        }


        /**
         * If we get here the input data
         * does not have the metafield set so we compile
         * the meta data out of data fields whose key matches 
         * one of the models metakeys;
         */

        $metadata = [];
        if(!empty($this->{$metaFieldName})){
            $metadata = $this->{$metaFieldName}; // the model may already have some metadata
        }
         
        /**
         * Get the metakeys assoiciated with the model.
         */
        $metakeys = collect( $this->metakeys() ); 

        /**
         * Transform the data
         */
        foreach($metakeys as $metakey){
            if(isSet($data[$metakey])){
                $data[$metaFieldName][$metakey] = $data[$metakey];
                unSet($data[$metakey]);
            } 
        }
        
       return $data;
    }

    

    /**
     * Override this method in the Model to use a differnt fieldname
     */
    protected function metaFieldName()
    {
        return 'meta';
    }

    /**
     * Override this method in the Model to return an array of allowed metakeys
     */
    protected function metakeys()
    {
        return [];
    }
}