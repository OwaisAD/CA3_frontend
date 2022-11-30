import React from 'react'

const GoogleMap = ({fromX, fromY, toX, toY}) => {
    return (
        <div className="google-map-code">
          <iframe src={`https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d2287077.802624354!2d9.716729330906636!3d55.852149691425474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m4!2s${fromY}%2C${fromX}!3m2!1d${fromY}!2d11.954892099999999!4m4!2s${toY}%2C${toX}!3m2!1d57.7378043!2d10.5908634!5e0!3m2!1sda!2sdk!4v1669845566584!5m2!1sda!2sdk&z=5`} width="450" height="375" style={{border:0}} allowfullscreen="" aria-hidden="false"></iframe>
        </div>
    );
}

export default GoogleMap
