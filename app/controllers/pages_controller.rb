class PagesController < ApplicationController
  def home
    @pitches = Pitch.all.as_json(include: {author: {only: :full_name}})
    @students = Student.all.as_json(include: :pitches)
  end

  def create
    ENV["phase"] = "0"
    ENV["pitches_per_student"] = params[:number_pitches]
    ENV["number_of_teams"] = params[:number_teams]
    ENV["size_of_pitch_subset"] = params[:size_of_pitch_subset]
    redirect_to root_path
  end

  def continue
    new_phase_integer = ENV["phase"].to_i + 1
    new_phase_string = new_phase_integer.to_s
    ENV["phase"] = new_phase_string
    redirect_to root_path
  end

  def reset
    Pitch.destroy_all
    Student.destroy_all
    Preference.destroy_all
    Vote.destroy_all
    TeamMember.destroy_all
    ENV["phase"] = "pre"
    redirect_to root_path
  end
end
